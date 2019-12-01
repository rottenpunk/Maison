const Sequelize = require('sequelize');
var mysql2 = require("mysql2");

// Connect to database...
module.exports  = new Sequelize('maison', 'maison', 'chicken', {
    host: '192.168.0.10',
    dialect: 'mysql'
});