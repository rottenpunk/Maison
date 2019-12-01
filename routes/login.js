const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const User = require('../models/user')

router.use(express.urlencoded());

// /admin/add-product => GET
router.get('/', function(req, res) {
    //res.send("Hello login World!");
    res.sendFile(process.cwd() + '/public/index.html');
});

router.post('/', function(req, res) {
    // find user in user table, then match hash of password
    User.findOne({ where: {UserId: req.body.username}}).then(user => {
        console.log("user:", user);
        // Need to compare bcrypt(password) against PassHash
        //console.log(req.body.password);
    });
   
    
});

module.exports = router;
