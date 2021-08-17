const express = require('express');
const router = express.Router();
const User = require('../models/user');
const fetch = require('node-fetch');
const config = require('../config/config');
const crypto = require('crypto');




router.get('/', function(req, res) {
    console.log("registration");
    if( typeof req.session.RegID !== 'undefined') {
        res.redirect('/checkout');
    } else {
        res.render('registration', {
            admin: req.session.isAdmin,
            pageTitle: 'Registration',
            isLoggedIn: req.session.isLoggedIn
        });
    }
});


router.post('/', function(req, res) {
    var form = req.body;

    var registration = {
        "Source":"Maison",
        "ParentFirstName": form.fname[1],
        "ParentLastName": form.lname[1],
        "StudentFirstName": form.fname[0],
        "StudentLastName": form.lname[0],
        "Email": form.email,
        "Address": form.address,
        "City": form.city,
        "State": form.state,
        "ZipCode": form.zipcode,
        "Phone1": form.tel1[0].concat(form.tel1[1],form.tel1[2]),
        "Phone2": form.tel2[0].concat(form.tel2[1],form.tel2[2]),
        "BirthDate": form.dob[2]+"-"+form.dob[0]+"-"+form.dob[1],
        "Age": form.age,
        "Interests": form.classes,
        "BoyGirl": form.gender,
        "Survey": form.Survey,
        "AcknowledgedPolicies": form.AcknowledgedPolicies,
        "AcknowledgedRelease": form.AcknowledgedRelease,
        "DateAcknowledged": new Date().toJSON().slice(0,10)
    }
    console.log(registration);


    //creating hmac object
    var hmac = crypto.createHmac('sha256', config.pdw_secret)
    //passing the data to be hashed
    var data = hmac.update(JSON.stringify(registration));
    //creating the hmac in the required format
    var hmac_data = data.digest('hex');

    // Save Parent first/last name for sending to Converge
    req.session.firstName = form.fname[1];      
    req.session.lastName  = form.lname[1];

    //send 
    fetch(config.pdwURL + 'incoming_web_customer_api/v1_register', {
        method: 'POST',
        body: JSON.stringify(registration), 
        headers: {
            'Content-Type': 'application/json',
            'HTTP_X_PDW_HMAC_SHA256': hmac_data
         }
    })
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
        if(jsonData.status === 'OK') {
            req.session.RegID = jsonData.id;
            res.redirect('/checkout');
        } else {
            throw new Error("Error sending registration");
        }
    })
    .catch(err => {
        console.log("Error: " + err);
        res.redirect('/unexpected');
    });
    
});

module.exports = router;