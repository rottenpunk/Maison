const bcrypt = require('bcryptjs');

function validatePassword(password, hash) {
    // 
    console.log("password: " + password + " hash: " + hash);
     return bcrypt.compareSync(password, hash, function(err, isMatch) {
        if (err) {
            console.log("Error");
            return err;
        }
        else { console.log(isMatch); return isMatch; }
    });
    
}
function generatePassword(password) {
    var salt = bcrypt.genSalt(10);
    var genHash = bcrypt.hash(password, salt);
    //return hash and salt
    return {
        salt: salt,
        hash: genHash
    };
}

module.exports.validatePassword = validatePassword;
module.exports.generatePassword = generatePassword;