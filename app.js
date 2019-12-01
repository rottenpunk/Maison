var express = require("express");
var http = require("http");
var app = express();
var admin = require("./routes/admin");
var login = require("./routes/login");

app.use("/admin", admin);
app.use("/login", login);


http.createServer(app).listen(3000);
