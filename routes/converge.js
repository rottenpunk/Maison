const express = require('express');
const router = express.Router();
const User = require('../models/user');
const fetch = require('node-fetch');
const crypto = require('crypto');
const config = require('../config/config');

// This Get endpoint was used for a proof of concept web page.  Not currently used.
//router.get('/', function(req, res) {
//    console.log("converge");
//    res.render('converge', {
//        admin: req.session.isAdmin,
//        pageTitle: 'Converge',
//        isLoggedIn: req.session.isLoggedIn
//    });
//});

// This post endpoint comes from customer clicking on "Finalize Sign-up" button on the
// checkout page.  The next step is getting the customer to sign up by providing his 
// credit card to our payment company's system (Converge). So, this endpoint does:
//   1. Make a call to PDW backend to make sure it is still up and we haven't already 
//      processed the customer's credit card (call to PDW's v1_prefinalize endpoint)
//   2. Call Converge to get a token (good for only 15 seconds, but that's all we need)
//   3. Redirect to Converge's Hosted Payment Page to interact with the customer.
// When Converge is finished, it will redirect back to us at one of three re-entry points:
//   a. cancel -- Customer cancelled the transaction and did not signup for recurring payments
//      See below for that endpoint.
//   b. decline -- Customer's credit card transaction failed.  Converge told me that this won't
//      happen, but there is code, just incase.  See below for that endpoint.
//   c. success -- Customer successfully signed up for recurring payments through the Converge
//      payment system.  See bellow for that endpoint.

router.post('/', function(req, res) {

    console.log("new_customer ID: " + req.session.RegID);
    var ssl_customer_code = "N-" + req.session.RegID;
    var amount = req.session.Tuition;   
    var now = new Date();
    
    if (now.getMonth() == 11) {
        var nextMonth = new Date(now.getFullYear() + 1, 0, 1)
    } else {
        var nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        }

    nextMonth = nextMonth.toISOString();
    var nextDate = nextMonth.substring(5,7) + "/" + nextMonth.substring(8,10) + "/" + nextMonth.substring(0,4);

    var converge_data = 
        "ssl_merchant_id=" + config.converge_merchantID +
        "&ssl_user_id=" + config.converge_merchantUserID +
        "&ssl_pin=" + config.converge_merchantPIN +
        "&ssl_transaction_type=ccaddrecurring" +
        "&ssl_amount=" + amount +
        "&ssl_next_payment_date=" + nextDate +
        "&ssl_billing_cycle=MONTHLY" +
        "&ssl_end_of_month=N" +
        "&ssl_first_name=" + req.session.firstName +
        "&ssl_last_name=" + req.session.lastName +
        "&ssl_customer_code=" + ssl_customer_code;

    // OK, now call PDW's v1_prefinalize call.  If there is an error, then
    // redirect to the Unexpected web page...
    var prefinalize_info = {
        "Source": "Maison",
        "id": req.session.RegID,
    }
    prefinalize_string = JSON.stringify(prefinalize_info);
    //get HMAC header
    var hmac = crypto.createHmac('sha256', config.pdw_secret)
    //passing the data to be hashed
    var hmac_info = hmac.update(prefinalize_string);
    //creating the hmac in the required format
    var hmac_data = hmac_info.digest('hex');

    // Call PDW backend to make sure it is still up and this customer hasn't 
    // been here before...
    fetch(config.pdwURL + 'incoming_web_customer_api/v1_prefinalize', {
        method: 'POST',
        body: prefinalize_string, 
        headers: {
            'Content-Type': 'application/json',
            'HTTP_X_PDW_HMAC_SHA256': hmac_data
        }
    })
    .then( function(response) {
        console.log("Got initial response from v1_prefinalize back");
        return response.json();
    })
    .then( function(resp_data) {
        if( resp_data.status == "ERROR")
            throw new Error("Invalid response from v1_prefinalize");
        return console.log(resp_data);
    })
    // Now, if we got here, the v1_prefinalize call went well and we can proceed to
    // talk to Converge to get a token...
    .then( () => {
        console.log("Fetching converge token");
        console.log(converge_data);
        return fetch(config.converge_token_url, {
            method: 'POST',
            body: converge_data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    })
    .then(function(response) { 
        console.log("Converge token request. Return status: " + response.status);
        if(response.status === 200) {                
            return response.text();
        } else {
            throw new Error("Status code error" );
        }
    })
    // OK, now we have a token from Converge, so now redirect to Converge's 
    // Hosted Payment page...
    .then(function(token) {  
        // redirect 
        token = encodeURIComponent(token);
        console.log(config.converge_hpurl + "?ssl_txn_auth_token=" + token);
        res.redirect(config.converge_hpurl + "?ssl_txn_auth_token=" + token);
    })
    .catch(err => {
        console.log("Error: Error in converge processing - " + err);
        res.redirect('/unexpected');
    })
});

// This endpoint gets redirected to us through the Converge Hosted Payments Page
// when the customer has successfully signed up for recurring payments. Here, we:
//   1. Save the return information from Converge into our finalize_queue table
//      just incase we are not able to call PDW's v1_finalize endpoint to finalize
//      signing up the customer for the classes he wants.
//   2. Call PDW's v1_finalize endpoint to finalize signing up the customer for
//      the classes he wants (and establishing Family, Student and recurring 
//      account records). If error, then redirect to the "Unexpected" error page.    
//   3. Redirect to the confirmation page to let the customer know everything was good.
//
router.post('/success', function(req,res){
    console.log("success");

    var user_info = {
        "Source": "Maison",
        "id": req.body.ssl_customer_code.slice(2),
        "CCSystemResponse": req.body
    }
    
    console.log(user_info)
    user_info = JSON.stringify(user_info);
    //get HMAC header
    var hmac = crypto.createHmac('sha256', config.pdw_secret)
    //passing the data to be hashed
    var data = hmac.update(user_info);
    //creating the hmac in the required format
    var hmac_data = data.digest('hex');

    //post to pdw v1_finalize 
    fetch(config.pdwURL + 'incoming_web_customer_api/v1_finalize', {
        method: 'POST',
        body: user_info, 
        headers: {
            'Content-Type': 'application/json',
            'HTTP_X_PDW_HMAC_SHA256': hmac_data
        }
    })
    .then(function(response) {
        if(response.status === 200) {
            res.redirect('/confirmation');
        } else {
            console.log("Error: converge.js unexpected http status code from v1_finalize: " + response.status);
            response.text().then( text => console.log(text));
            res.redirect('/unexpected');
        }
    })
    .catch(function(err) {
        console.log("Error: " + err)
        res.redirect('/unexpected');
    })
    
});

router.post('/decline', function(req,res){
    var user_info = {
        "Source": "Maison",
        "id": req.body.ssl_customer_code.slice(2),
    }
    
    console.log(user_info)
    user_info = JSON.stringify(user_info);

    
    //get HMAC header
    var hmac = crypto.createHmac('sha256', config.pdw_secret)
    //passing the data to be hashed
    var data = hmac.update(user_info);
    //creating the hmac in the required format
    var hmac_data = data.digest('hex');

    fetch(config.pdwURL + 'incoming_web_customer_api/v1_declined', {
        method: 'POST',
        body: user_info, 
        headers: {
            'Content-Type': 'application/json',
            'HTTP_X_PDW_HMAC_SHA256': hmac_data
        }
    }).then(function(response) {
        console.log(response);
        res.render('/decline')
    })
    .catch(function(err) {
        console.log("Error: " + err)
        res.render('/decline')
    })
});

router.post('/cancel', function(req,res){
    var user_info = {
        "Source": "Maison",
        "id": req.body.ssl_customer_code.slice(2),
    }
    
    user_info = JSON.stringify(user_info);

    
    //get HMAC header
    var hmac = crypto.createHmac('sha256', config.pdw_secret)
    //passing the data to be hashed
    var data = hmac.update(user_info);
    //creating the hmac in the required format
    var hmac_data = data.digest('hex');

    fetch(config.pdwURL + 'incoming_web_customer_api/v1_cancelled', {
        method: 'POST',
        body: user_info, 
        headers: {
            'Content-Type': 'application/json',
            'HTTP_X_PDW_HMAC_SHA256': hmac_data
        }
    }).then(function(response) {
        console.log(response)
        res.redirect('/classes')
    })
    .catch(function(err) {
        console.log("Error: " + err)
        res.redirect('/classes')
    })
    
});

module.exports = router;