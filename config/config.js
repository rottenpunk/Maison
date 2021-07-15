//---------------------------------------------------------------
// This file contains various operational variables...
//---------------------------------------------------------------

const config = {
    port: 3000,
    secureport: 443,
    pdwURL: 'https://jsys.johnoverton.com/PacificDanceWare/index.php/',
    pdw_secret: '8c4c7f513b667d005516fbf935a6acc4a85c343210af3551ceb451c84a713f03', 
    // Sessions...
    session_secret: '@The1995SuperSecret@',

    // Access to the database system...
    database_name:     'maison', 
    database_username: 'maison', 
    database_password: 'chicken'
}

module.exports = config;