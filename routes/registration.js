const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, function(req, res) {
    console.log("registration");
    res.render('registration', {
        admin: req.session.isAdmin,
        pageTitle: 'Registration',
        isLoggedIn: req.session.isLoggedIn
    });
});

module.exports = router;