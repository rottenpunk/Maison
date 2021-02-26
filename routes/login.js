const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport   = require('passport');
var flash = require('connect-flash');

router.get('/', function(req, res) {
    console.log("login page");
    res.render('login', {
        pageTitle: 'Login',
        message: req.flash('error')
        
    });
    console.log(req.flash('error'));
});



router.post('/', passport.authenticate('local', 
    { 
    successRedirect: '/welcome',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    }
   ),
    function(req, res) { 
    // At some point it would be a good idea to validate the user's ip address.
    // That means that we should save the ip address when we validate the user and
    // add the ip address to the session data.  Everytime the user sends a request, we
    // want to make sure that he is still at the same IP address.  Otherwise, he
    // is starting another session on another device and he must sign in again and
    // start another session. (Otherwise, it might be someone maliciously trying to
    // use the system with his credentials!)
    //  For now, save this code to gather the TCP/IP address.  We'll add code to
    // do something with it later...
    //res.send(req.flash());
    //console.log(req.flash('message')[0]); 
    
    var ip = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log("req ip addresss: " + ip);
   
    
});


module.exports = router;
