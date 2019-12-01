const Model = Sequelize.Model;
class User extends Model {}
User.init({
  // attributes
  UserId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  PassHash: {
    type: Sequelize.STRING
    allowNull: false 
  },
  Name: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'user'
  // options
});