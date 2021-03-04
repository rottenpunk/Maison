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
async function generatePassword(password) {
    try {
        const saltRounds = await bcrypt.genSalt(10);
        const genHash = await bcrypt.hash(password, saltRounds);
        console.log(genHash);
        return genHash;
    }
    catch (error) {
        console.log(error);
        return error;
    }

    return null;
    
    
}

module.exports.validatePassword = validatePassword;
module.exports.generatePassword = generatePassword;