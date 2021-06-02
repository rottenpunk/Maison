const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, function(req, res) {
    console.log("checkout");
    res.render('checkout', {
        admin: req.session.isAdmin,
        pageTitle: 'Checkout',
        isLoggedIn: req.session.isLoggedIn
    });
});

router.get('/converge', isAuth, function(req, res) {
    console.log("checking out in mock converge");
    //res.redirect('/converge');
});

module.exports = router;