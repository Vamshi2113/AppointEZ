const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlize.js');
const User = require('./userModel.js'); // Import User model

const UserData = sequelize.define('UserData', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  coordinates: {
    type: DataTypes.STRING, // Adjust the data type based on your needs
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  gender: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
});



UserData.createUserData = async function (username, email, coordinates, phoneNumber, age, gender, city, userId) {
    try {
      const userData = await UserData.create({
        username,
        email,
        coordinates,
        phoneNumber,
        age,
        gender,
        city,
        userId,
      });
  
      return userData;
    } catch (error) {
      throw error;
    }
  };
  







// Define the association between User and UserData
UserData.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(UserData, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = UserData;
