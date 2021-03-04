const express = require('express');
const User = require('../models/user');
const generatePassword = require('../utils/passwordUtils').generatePassword;
const router = express.Router();

// /admin/add-product => GET
router.get('/', function(req, res) {
    console.log("Hello from Routes");
    res.render('admin', {pageTitle: 'Admin', users: null});
});

router.post('/', function(req, res) {
      console.log("post method");


      if (req.body.adminBttn==='Find') {
        User.findAll({where: { UserId: req.body.username }})
        .then((user) => {
            if(user) { 
                console.log(user);
                res.render('admin', {
                    pageTitle: 'Admin', 
                    users: user
            });
            }
        })
        .catch((err) => {
                return err;
        })
      }

      if (req.body.adminBttn==='Add') {
        console.log(req.body);
        generatePassword(req.body.password)
        .then((passHash) => {
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

      if (req.body.adminBttn==='Update') {
        User.findOne({where: { UserId: req.body.username }})
        .then((user) => {
            if (user) {
                if (req.body.password) {
                    generatePassword(req.body.password)
                    .then((passHash) => {
                        console.log(passHash);
                        user.PassHash = passHash;
                        user.save();
                    })
                    .catch((err) => {
                        console.log(err);
                        return err;
                    });
                }
                if (req.body.name) {
                    user.Name = req.body.name;
                }
                if (req.body.email) {
                    user.Email = req.body.email;
                }
                user.save();
                userArray = [];
                userArray.push(user);
                res.render('admin', {
                    pageTitle: 'Admin', 
                    users: userArray
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return err;
        });

      }
      if (req.body.adminBttn==='Delete') {
        User.findAll({where: { UserId: req.body.username }})
        .then((user) => {
            user.destroy();
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
      }

      if (req.body.adminBttn==='Show All') {
          User.findAll()
          .then((users) => {
            res.render('admin', {
                pageTitle: 'Admin', 
                users: users
            });
          })
          .catch((err) => {
              console.log(err);
              return err;
          })
      }


  });

module.exports = router;