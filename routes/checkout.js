const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config/config');
const crypto = require('crypto');
const fetch = require('node-fetch');

router.get('/', function(req, res) {
    console.log("checkout");
    res.render('checkout', {
        admin: req.session.isAdmin,
        pageTitle: 'Checkout',
        isLoggedIn: req.session.isLoggedIn
    });
console.log("ID: " + req.session.RegID + " " + req.session.cart);
});

router.post('/', function(req, res){

        classes = {
            "Source": "Maison",
            "id": req.session.RegID, 
            "classes": req.session.cart
        }
         
        //creating hmac object
        var hmac = crypto.createHmac('sha256', config.pdw_secret)
        //passing the data to be hashed
        var data = hmac.update(JSON.stringify(classes));
        //creating the hmac in the required format
        var hmac_data = data.digest('hex');
    
    
        //send 
        fetch(config.pdwURL + 'incoming_web_customer_api/v1_add_classes', {
            method: 'POST',
            body: JSON.stringify(classes), 
            headers: {
                'Content-Type': 'application/json',
                'HTTP_X_PDW_HMAC_SHA256': hmac_data
             }
        })
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            req.session.Tuition = jsonData.Tuition;
            
            res.send(jsonData);
        })
        .catch(err => {
            console.log("Error: " + err);
        });


})

module.exports = router;