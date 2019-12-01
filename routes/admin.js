const express = require('express');
const router = express.Router();

// /admin/add-product => GET
router.get('/', function(req, res) {
    console.log("Hello from Routes");
    res.send("Hello route World!");
});

module.exports = router;