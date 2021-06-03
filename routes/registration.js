const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', function(req, res) {
    console.log("registration");
    res.render('registration', {
        admin: req.session.isAdmin,
        pageTitle: 'Registration',
        isLoggedIn: req.session.isLoggedIn
    });
});

module.exports = router;