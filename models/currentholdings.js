'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class currentholdings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      currentholdings.belongsTo(models.bookedAppointments,{onDelete: 'CASCADE'})
    }
  }
  currentholdings.init({
    credits: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'currentholdings',
  });
  return currentholdings;
};