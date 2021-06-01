const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, function(req, res) {
    console.log("checkout");
    res.render('checkout', {
        admin: req.session.isAdmin,
        pageTitle: 'checkout',
        isLoggedIn: req.session.isLoggedIn
    });
});

module.exports = router;