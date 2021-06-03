const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', function(req, res) {
    console.log("confirmation");
    res.render('confirmation', {
        admin: req.session.isAdmin,
        pageTitle: 'Confirmation',
        isLoggedIn: req.session.isLoggedIn
    });
});

module.exports = router;