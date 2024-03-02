const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/sqlize.js');
const { UserData }= require('./userDataModel.js')



const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  });



  User.findByUsername = async function (username) {
    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
  
      return user;
    } catch (error) {
      throw error;
    }
  };



  User.createUser = async function (username, password, refreshToken, userData) {
    try {
      const user = await User.create({ username, password, refreshToken });
  
      // If userData is provided, create associated UserData
      if (userData) {
        // Ensure that the userId is set to the user's ID
        const userDataInstance = { ...userData, userId: user.id };
        
        // Create or update UserData
        await UserData.upsert(userDataInstance);
      }
  
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  //association between User and UserData
  User.hasOne(UserData, { foreignKey: 'userId', onDelete: 'CASCADE' });
  UserData.belongsTo(User, { foreignKey: 'userId' });








  
  module.exports = User;