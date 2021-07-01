const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', function(req, res) {
    console.log("checkout");
    res.render('checkout', {
        admin: req.session.isAdmin,
        pageTitle: 'Checkout',
        isLoggedIn: req.session.isLoggedIn
    });
console.log(req.session.cart);
});

module.exports = router;