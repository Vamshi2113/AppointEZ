'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderhistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderhistory.belongsTo(models.bookedAppointments,{foreignKey:'appointmentId',onDelete:'CASCADE'})
      orderhistory.belongsTo(models.as_user,{ foreignKey: 'userId' ,onDelete: 'CASCADE'})
      orderhistory.belongsTo(models.as_service_provider,{ foreignKey:'serviceProviderId',onDelete: 'CASCADE' });
    }
  }
  orderhistory.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orderhistory',
  });
  return orderhistory;
};