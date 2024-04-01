'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class as_service_provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      as_service_provider.belongsTo(models.UserData,{ foreignKey: 'userDataId' ,onDelete: 'CASCADE'});;
      as_service_provider.hasMany(models.createAppointment,{ foreignKey: 'serviceProviderId' ,onDelete: 'CASCADE'});
      as_service_provider.hasMany(models.bookedAppointments,{ foreignKey:'serviceProviderId',onDelete: 'CASCADE' });
      as_service_provider.hasMany(models.orderhistory,{ foreignKey:'serviceProviderId',onDelete: 'CASCADE' });
      
      
    }

    static createAsServiceProvider(roles_Id,username) {
      return as_user.create({
        userDataId:roles_Id,
        username:username,
      });
    }
  }
  as_service_provider.init({
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'as_service_provider',
  });
  return as_service_provider;
};