'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      types.hasMany(models.createAppointment,{foreignKey:'typeId',onDelete:'CASCADE'})
    }
  }
  types.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'types',
  });
  return types;
};