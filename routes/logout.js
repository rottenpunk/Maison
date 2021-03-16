const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');
var flash = require('connect-flash');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, function(req, res) {
    req.session.isLoggedIn = false;
    req.session.isAdmin = false;
    res.render('login', {
        isLoggedIn: req.session.isLoggedIn,
        pageTitle: 'Login',
        admin: req.session.isAdmin,
        message: req.flash('error')
    });

});

module.exports = router;