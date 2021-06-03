const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', function(req, res) {
    console.log("converge");
    res.render('converge', {
        admin: req.session.isAdmin,
        pageTitle: 'Converge',
        isLoggedIn: req.session.isLoggedIn
    });
});


module.exports = router;