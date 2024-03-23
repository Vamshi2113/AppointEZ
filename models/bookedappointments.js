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

    static async deleteById(appointmentId) {
      try {
        const bookedAppointment = await this.findByPk(appointmentId);

        if (bookedAppointment) {
          await bookedAppointment.destroy();
          console.log('Booked appointment deleted successfully!');
          return true; // Indicate success
        } else {
          console.log('Booked appointment not found.');
          return false; // Indicate failure
        }
      } catch (error) {
        console.error('Error deleting booked appointment:', error);
        throw error; // Propagate the error
      }
    }

    static async createEntry(status, createAppointmentId, userId, serviceProviderId) {
      try {
        // Create a new appointment
        const newAppointment = await this.create({ status, createAppointmentId, userId, serviceProviderId });

        console.log('Booked appointment created successfully!');
        return newAppointment; // Return the created appointment
      } catch (error) {
        console.error('Error creating booked appointment:', error);
        throw error; // Propagate the error
      }
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