const express = require('express');
const router = express.Router();

// /admin/add-product => GET
router.get('/', function(req, res) {
    res.send("Hello login World!"); 
});

router.post('/', function(req, res) {
    
});

module.exports = router;