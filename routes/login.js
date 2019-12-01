const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');

router.use(express.urlencoded());

// /admin/add-product => GET
router.get('/', function(req, res) {
    //res.send("Hello login World!");
    res.sendFile(process.cwd() + '/public/index.html');
});

router.post('/', function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
});

module.exports = router;
