'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserData.belongsTo(models.user);
      
      UserData.hasOne(models.as_user,{foreignKey: 'userDataId', onDelete: 'CASCADE'});
      UserData.hasOne(models.as_service_provider,{foreignKey: 'userDataId', onDelete: 'CASCADE'});
      UserData.hasMany(models.createAppointment,{foreignKey: 'userDataId', onDelete: 'CASCADE'});
    }

    static createUserData(username,userData, userId) {
      return UserData.create({
        username:username,
        ...userData,
        userId: userId,
      });
    }


  }
  UserData.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserData',
  });

  return UserData;
};