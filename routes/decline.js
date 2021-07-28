const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', function(req, res) {
    console.log("decline");
    res.render('decline', {
        admin: req.session.isAdmin,
        pageTitle: 'Declined',
        isLoggedIn: req.session.isLoggedIn
    });
});

module.exports = router;