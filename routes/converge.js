const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, function(req, res) {
    console.log("converge");
    res.render('converge', {
        admin: req.session.isAdmin,
        pageTitle: 'Converge',
        isLoggedIn: req.session.isLoggedIn
    });
});

router.get('/confirmation', isAuth, function(req, res) {
    console.log("Thank you!");
    
});

module.exports = router;