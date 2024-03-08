'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class createAppointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      createAppointment.belongsTo(models.as_service_provider,{ foreignKey: 'serviceProviderId' ,onDelete: 'CASCADE'})
      createAppointment.belongsTo(models.UserData,{foreignKey: 'userDataId', onDelete: 'CASCADE'})
      createAppointment.belongsTo(models.types,{foreignKey:'typeId',onDelete:'CASCADE'})

      createAppointment.hasMany(models.bookedAppointments,{ foreignKey: 'createAppointmentId' ,onDelete: 'CASCADE'})
      createAppointment.hasMany(models.ratings,{ foreignKey: 'createAppointmentId' ,onDelete: 'CASCADE'})
      
      
    }
  }
  createAppointment.init({
    username: DataTypes.STRING,
    from_time: DataTypes.TIME,
    to_time: DataTypes.TIME,
    at: DataTypes.STRING,
    desc: DataTypes.TEXT,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'createAppointment',
  });
  return createAppointment;
};