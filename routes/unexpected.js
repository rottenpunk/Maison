const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', function(req, res) {
    console.log("unexpected");
    res.render('unexpected', {
        admin: req.session.isAdmin,
        pageTitle: 'Unexpected',
        isLoggedIn: req.session.isLoggedIn
    });

});

module.exports = router;