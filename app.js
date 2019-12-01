var express = require("express");
var http = require("http");
var app = express();
var admin = require("./routes/admin");
var login = require("./routes/login");
var mysql2 = require("mysql2");
const Sequelize = require('sequelize');

// Connect to database...
const database = new Sequelize('maison', 'maison', 'chicken', {
  host: '192.168.0.10',
  dialect: 'mysql'
});

// If connected to database, log...
database
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = database;

app.use("/admin", admin);
app.use("/login", login);

app.use("", function(req,res) {
    console.log(req);
})

http.createServer(app).listen(3000);
