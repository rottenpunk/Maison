const Sequelize = require('sequelize');
const database  = require('../utils/database');

const FinalizeQueue = database.define('finalize_queue', {

  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true, 
    autoIncrement: true,
  },
  NewCustId: {
    type: Sequelize.INTEGER,
    allowNull: false 
  },             
  Processed: {
    type: Sequelize.STRING,
    allowNull: true
  },

  FinalizeJson: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
    freezeTableName: true,
});

module.exports = FinalizeQueue;