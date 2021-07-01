const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');
var flash = require('connect-flash');
const isAuth = require('../middleware/is-auth');


router.get('/', function(req, res) {
    console.log("login page");
    res.render('login', {
        isLoggedIn: req.session.isLoggedIn,
        pageTitle: 'Login',
        admin: req.session.isAdmin,
        message: req.flash('error')
    });
    
});
 

router.post('/', passport.authenticate('local', 
    { 
    successRedirect: false,
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    }),
    function(req, res) { 
        req.session.isLoggedIn = true;
        req.session.isAdmin = req.user.dataValues.isAdmin;
        var ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        console.log("req ip addresss: " + ip);
        req.session.save(function(err) {
            res.redirect('/welcome');
        })
   
    
});


module.exports = router;
