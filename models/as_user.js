'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class as_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      as_user.belongsTo(models.UserData,{ foreignKey: 'userDataId',onDelete: 'CASCADE' });
      as_user.hasMany(models.bookedAppointments,{ foreignKey:'userId',onDelete: 'CASCADE' });
      as_user.hasMany(models.ratings,{ foreignKey: 'userId' ,onDelete: 'CASCADE'})
      as_user.hasMany(models.orderhistory,{ foreignKey: 'userId' ,onDelete: 'CASCADE'})
      
      
      
      
    }

    static createAsUser(roles_Id,username) {
      return as_user.create({
        userDataId:roles_Id,
        username:username,
      });
    }
    
  }
  as_user.init({
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'as_user',
  });
  return as_user;
};