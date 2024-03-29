const passport         = require('passport');
const localStrategy    = require('passport-local').Strategy;
const database         = require("../utils/database");
const User             = require('../models/user');
const validatePassword = require('../utils/passwordUtils').validatePassword;
var flash              = require('connect-flash');


const verifyCallback = (username, password, done) => {
    console.log("verifyCallback");
    User.findOne({where: { UserId: username }})
    .then((user) => {
        if (!user) { 
            console.log("Invalid User");
            return done(null, false, {message: 'Invalid username'}); 
        } 
            const isValid = validatePassword(password, user.PassHash);
            console.log("Password is valid: " + isValid);
    
        if(!isValid) {
            console.log("invalid");
            return done(null, false, {message: 'Invalid password'});
        } else {
            console.log("password is valid");
            return done(null, user);
            }
        })
        .catch((err) => {
            return err;
        });
          
}


const strategy = new localStrategy(verifyCallback);
passport.use(strategy);

 //look into these functions
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((userId, done) => {
    User.findOne({where: { UserId: userId }})
    .then((user) => {
        done(null, user);
    })
    .catch(err => done(err))
});

module.exports = passport;