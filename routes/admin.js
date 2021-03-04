const express = require('express');
const User = require('../models/user');
const generatePassword = require('../utils/passwordUtils').generatePassword;
const router = express.Router();

// /admin/add-product => GET
router.get('/', function(req, res) {
    console.log("Hello from Routes");
    res.render('admin', {pageTitle: 'Admin', user: null});
});

router.post('/', function(req, res) {
      console.log("post method");
      if (req.body.adminBttn==='Find') {
        User.findOne({where: { UserId: req.body.username }})
        .then((user) => {
            if(user) { 
                console.log(req.body.adminBttn);
                res.render('admin', {
                    pageTitle: 'Admin', 
                    user: user["dataValues"]
            });
            }
        })
        .catch((err) => {
                return err;
        })
      }
      if (req.body.adminBttn==='Add') {
        console.log(req.body);
        const passHash = generatePassword(req.body.password)
        .then(function() {
            console.log(passHash);
            User.create({
                UserId: req.body.username, 
                PassHash: passHash, 
                Name: req.body.name, 
                Email: req.body.email
            })
              .then((user) => {
                console.log(user);
              })
              .catch((err) => {
                console.log(err);
                return err;
              }); 
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
        
   

      }
  });

module.exports = router;