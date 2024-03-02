const jwt=require('jsonwebtoken');



const generateRefreshToken = (username) => {
    return jwt.sign(
      { "username": username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '2000d' }
    );
  }

  module.exports = {
    generateRefreshToken
  };    



