'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookedAppointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookedAppointments.hasOne(models.orderhistory,{foreignKey:'appointmentId',onDelete:'CASCADE'})
      bookedAppointments.belongsTo(models.createAppointment,{ foreignKey: 'createAppointmentId' ,onDelete: 'CASCADE'})
      bookedAppointments.belongsTo(models.as_user,{ foreignKey:'userId',onDelete: 'CASCADE' });
      bookedAppointments.belongsTo(models.as_service_provider,{ foreignKey:'serviceProviderId',onDelete: 'CASCADE' });
    }
  }
  bookedAppointments.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bookedAppointments',
  });
  return bookedAppointments;
};