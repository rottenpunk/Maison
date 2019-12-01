const Sequalize = require('sequelize');
const  database   = require('../app.js');

const Model = database.Model;

class User extends Model {}
User.init({
  // attributes
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
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
}, {
  sequelize,
  modelName: 'user'
  // options
});

module.exports = User;