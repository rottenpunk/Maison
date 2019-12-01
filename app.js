var express = require("express");
var http = require("http");
var app = express();
var admin = require("./routes/admin");
var login = require("./routes/login");
var mysql2 = require("mysql2");
const Sequelize = require('sequelize');

// Connect to database...
const sequelize = new Sequelize('maison', 'maison', 'chicken', {
  host: '192.168.0.10',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use("/admin", admin);
app.use("/login", login);

http.createServer(app).listen(3000);
