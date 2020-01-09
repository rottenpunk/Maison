const express = require('express');
const router = express.Router();
const User = require('../models/user')

//
router.get('/', function(req, res) {
    //
    res.sendFile(process.cwd() + '/public/index.html');
});

router.post('/', function(req, res) {
    // At some point it would be a good idea to validate the user's ip address.
    // That means that we should save the ip address when we validate the user and
    // add the ip address to the session data.  Everytime the user sends a request, we
    // want to make sure that he is still at the same IP address.  Otherwise, he
    // is starting another session on another device and he must sign in again and
    // start another session. (Otherwise, it might be someone maliciously trying to
    // use the system with his credentials!)
    //  For now, save this code to gather the TCP/IP address.  We'll add code to
    // do something with it later...
    var ip = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log("req ip addresss: " + ip);
    
    // OK, so now try to sign the user on.  First, find a match in the 
    // user table, then match his hash of password using bcrypt...
    User.findOne({ where: {UserId: req.body.username}})
        .then(user => {
            if (user === null) {
                // Error!  no record of this user. Send error 
                // message on refresh of screen.  
            } else {
                // OK, we found this guy in the user table.  Match his 
                // password hash with bcrypt...
                console.log("user:", user);  // debug.  Look at his user entry.
                // Need to compare bcrypt(password) against PassHash
                //console.log(req.body.password);
            }
        });
   
    
});

module.exports = router;
