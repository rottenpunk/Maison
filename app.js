const express    = require('express');
const http       = require('http');
const https      = require('https');
const bodyparser = require('body-parser');
const session    = require('express-session');
const SessionStore = require('connect-session-sequelize')(session.Store);
const csrf       = require('csurf');


const config     = require("./config/config");
const database   = require("./utils/database");
const admin      = require("./routes/admin");
const login      = require("./routes/login");

var app = express();
// Cross-site request forgery attack protection...
//const csrfProtection = csrf();  // TODO: Need some options for this.

const port       = config.port;
const secureport = config.secureport;

// If connected to database, log...
database
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Uncomment when we are ready to provide https:// support...
// Read in the certificate/key...
//const https_options = {
//  key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
//  cert: fs.readFileSync("/srv/www/keys/chain.pem")
//};

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyparser.urlencoded({ extended: false }));

// Cross-site request forgery attack protection...
// app.use(csrfProtection);    // Can't use until we have options above.

// Session management...   "express-session" provides session management which
// Sends session "cookie" with the session number to the browser.  Receive the
// session "cookie" back from the browser so that we can track what user is doing...
app.use(
    session({
        secret: config.session_secret,
        resave: false,
        store: new SessionStore({
            db: database
        }),
        saveUninitialized: false,
        prozy: true 
    })
);

// Now define the top-level route table, which deligates to various route modules...  
app.use("/admin", admin);
app.use("/login", login);

// Last route...
// app.use(errorController.get404);

http.createServer(app).listen(port, () => {
  console.log('Server is up on port ' + port);
});

// Uncomment when we are ready to provide https:// support...
//https.createServer(https_options, app).listen(secureport, () => {
//  console.log('Server is up on secure port ' + secureport);
//});


