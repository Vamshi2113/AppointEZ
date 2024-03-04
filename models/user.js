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
      }) // Return user after creation
    }

    static async updateUserRefreshToken(userId, newRefreshToken) {
      try {
        const userx = await user.findByPk(userId);
  
        if (userx) {
          userx.refreshToken = newRefreshToken;
          await userx.save();
          return userx;
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        throw error;
      }
    }



    static findByRefreshToken(refreshToken) {
      return user.findOne({
        where: {
          refreshToken: refreshToken,
        },
      });
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
