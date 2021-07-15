const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const http = require('https')
const fetch = require('node-fetch');
const config = require('../config/config');

router.get('/', function(req, res) {
    console.log("classes");
    res.render('classes', {
        admin: req.session.isAdmin,
        pageTitle: 'Classes',
        isLoggedIn: req.session.isLoggedIn
    });
});

router.post('/cart', function(req, res) {
    // save cart into session
    //console.log(req.body);


    req.session.cart = req.body;
    
    
    // redirect to registration page

    res.render('classes', {
        admin: req.session.isAdmin,
        pageTitle: 'Classes',
        isLoggedIn: req.session.isLoggedIn
    });
    
});

router.get('/cart', function(req, res) {
    var cart = req.session.cart;
    fetch(config.pdwURL + 'class_api?ClassID=['+cart+']')
    .then(res => res.json())
    .then(json => res.send(json));
});






module.exports = router;