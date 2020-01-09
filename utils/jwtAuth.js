// Authorization with JSONWebTokens...

var jwt    = require('jsonwebtoken');
var config = require('../config/config');

function userSessionSign(data) {
    var token = jwt.sign(data, config.jwtSigningCode);
    return token;
}

module.exports.userSessionSign = userSessionSign;