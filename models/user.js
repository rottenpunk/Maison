const Sequelize = require('sequelize');
const database  = require('../utils/database');

const User = database.define('user', {


  // attributes
  UserId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  PassHash: {
    type: Sequelize.STRING,
    allowNull: false 
  },
  Name: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  Email: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
});

module.exports = User;