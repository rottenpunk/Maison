//---------------------------------------------------------------
// This file contains various operational variables...
//---------------------------------------------------------------

const config = {

    // HTTP and HTTPS ports.  If either are 0, then there is no service for that protocol...
    port: 0,              // Usually 80
    secureport: 8080,     // Usually 443

    // Sessions...
    session_secret: '@The1995SuperSecret@',

    // Access to the database system...
    database_name:     'maison', 
    database_username: 'maison', 
    database_password: 'chicken',

    // Access to PDW.  Secret hash key...
    pdwURL: 'https://jsys.johnoverton.com/PacificDanceWare/index.php/',
    pdw_secret: '8c4c7f513b667d005516fbf935a6acc4a85c343210af3551ceb451c84a713f03', 

    // Access to Converge...
    converge_merchantID: "0022776",
    converge_merchantUserID: "apiuser",
    converge_merchantPIN: "S3HJJ7K7RH0OTJLC0GD2MM71GTZMKQHGH1XX9LL7LOH0RLIDJI2NO898XH63Y1N8",
    converge_token_url: "https://api.demo.convergepay.com/hosted-payments/transaction_token",
    converge_hpurl: "https://api.demo.convergepay.com/hosted-payments",
}

module.exports = config;