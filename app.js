var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response) {
    console.log("Incoming request" + request.url);
    response.end("<h1>Hello World<h1>!");
});

http.createServer(app).listen(3000);
