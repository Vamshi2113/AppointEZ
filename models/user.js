'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasOne(models.UserData);
    }

    static findByUsername(username) {
      return user.findOne({
        where: {
          username: username,
        },
      });
    }

    static createUser(username, password, refreshToken) {
      return user.create({
        username: username,
        password: password,
        refreshToken: refreshToken,
      }).then(user => user.id); // Return user.id after creation
    }
  }

  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });

  return user;
};
