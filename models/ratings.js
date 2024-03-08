'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ratings.belongsTo(models.createAppointment,{ foreignKey: 'createAppointmentId' ,onDelete: 'CASCADE'})

      ratings.belongsTo(models.as_user,{ foreignKey: 'userId' ,onDelete: 'CASCADE'})

    }
  }
  ratings.init({
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ratings',
  });
  return ratings;
};