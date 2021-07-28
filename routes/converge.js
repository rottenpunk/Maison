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
    var merchantID = "0022776";
    var merchantUserID= "apiuser";
    var merchantPIN = "S3HJJ7K7RH0OTJLC0GD2MM71GTZMKQHGH1XX9LL7LOH0RLIDJI2NO898XH63Y1N8"; 
    var url = "https://api.demo.convergepay.com/hosted-payments/transaction_token";
    var hpurl = "https://api.demo.convergepay.com/hosted-payments"; 
    var nextDate = "08/01/2021"
    

    var amount = "52.00";

    data = 
        "ssl_merchant_id=" + merchantID +
        "&ssl_user_id=" + merchantUserID +
        "&ssl_pin=" + merchantPIN +
        "&ssl_transaction_type=ccaddrecurring" +
        "&ssl_amount=" + amount +
        "&ssl_next_payment_date=" + nextDate +
        "&ssl_billing_cycle=MONTHLY" +
        "&ssl_end_of_month=N" +
        "&ssl_customer_code=12345";

    

    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            //'Accept: */*'
         }
        })
        .then(function(response) { 
            if(response.status === 200) {
                response.text()
                .then(function(token) {  
                    // redirect 
                    res.redirect(hpurl + "?ssl_txn_auth_token=" + token);
                })
                .catch(err => {
                    console.log("Error response: " + response.status + " error msg: " + err);
                })
            }
        })
        .catch(err => {
            console.log("Error: " + err);
        });
    
});

router.post('/decline', function(req,res){
    res.write("Subscription declined");
    //endpoint where something has gone wrong
    console.log("decline");
});

router.post('/cancel', function(req,res){
    res.send("Subscription cancelled");
    //redirect back to classes list or checkout page?

    console.log("cancel");
});

router.post('/success', function(req,res){
    res.send("Subscription success");
    console.log("success");

    

    //parse converge info
    
    console.log(req.body)
    
    var user_info = req.body;
    user_info["id"] = req.session.RegID;
    user_info["Source"] = "Maison";
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
    res.redirect('/confirmation');
});


module.exports = router;