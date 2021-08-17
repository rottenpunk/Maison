const express = require('express');
const router = express.Router();
const User = require('../models/user');
const fetch = require('node-fetch');
const crypto = require('crypto');
const config = require('../config/config');


router.get('/', function(req, res) {
    console.log("converge");
    res.render('converge', {
        admin: req.session.isAdmin,
        pageTitle: 'Converge',
        isLoggedIn: req.session.isLoggedIn
    });
});


router.post('/', function(req, res) {

    console.log("converge ID: " + req.session.RegID);
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

    var data = 
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

    fetch(config.converge_token_url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            //'Accept: */*'
         }
        })
        .then(function(response) { 
            console.log("Converge token request. Return status: " + response.status);
            if(response.status === 200) {                
                response.text()
                .then(function(token) {  
                    // redirect 
                    token = encodeURIComponent(token);
                    console.log(config.converge_hpurl + "?ssl_txn_auth_token=" + token);
                    res.redirect(config.converge_hpurl + "?ssl_txn_auth_token=" + token);
                })
                .catch(err => {
                    console.log("Error response: " + response.status + " error msg: " + err);
                    res.redirect('/unexpected');
                })
            } else {
                res.redirect('/unexpected');
            }
        })
        .catch(err => {
            console.log("Error: " + err);
        });
    
});


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