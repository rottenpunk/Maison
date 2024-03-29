const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, function(req, res) {
    console.log("welcome page");
    res.render('welcome', {
        admin: req.session.isAdmin,
        pageTitle: 'Welcome',
        isLoggedIn: req.session.isLoggedIn
    });
});

module.exports = router;