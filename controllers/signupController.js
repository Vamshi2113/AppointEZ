const { user, UserData } = require("../models");
const refreshTokengen = require('./createRefreshToken.js');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  if((!user)&&(!UserData)){
    return res.status(400).json({"usernot":"yyhfd"});
  }
  const { password, username } = req.body;

  if (!username || !password) {
    return res.status(400).json({ "message": "Enter username and password" });
  }

  try {
    // Check if the username already exists
    const checkUsername = await user.findByUsername(username);

    if (checkUsername) {
      return res.status(409).json({ "message": "User already exists" });
    } else {
      try {
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Generate refresh token
        const refreshToken = refreshTokengen.generateRefreshToken(username);
        // Create the new user
        const user = await user.createUser(username, hashedPassword, refreshToken);
        console.log("========================",user);

        if(user){await UserData.createUserData(req.body.userData, user.id);}
        

        res.status(201).json({ 'success': `New user ${user.username} created!` });
      } catch (err) {
        res.status(500).json({ 'message': err.message });
      }
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json({ "message": "Internal server error" });
  }
};

module.exports = {
  handleNewUser,
};
