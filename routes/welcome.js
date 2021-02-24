const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');

router.get('/', function(req, res) {
    console.log("welcome page");
    res.render('welcome', {
        pageTitle: 'Welcome'
    });
});

module.exports = router;