const express = require('express');
const router = express.Router();
const User = require('../models/user');
const fetch = require('node-fetch');


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
    var url = "http://api.demo.convergepay.com/hosted-payments/transaction_token";
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
        .then(response => console.log(response))
        /* .then(jsonData => {
            console.log(jsonData);
            if(jsonData.status === 'OK') {
            // redirect to converge 
            }
        }) */
        .catch(err => {
            console.log("Error: " + err);
        });


});


module.exports = router;