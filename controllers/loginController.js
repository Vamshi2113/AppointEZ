const { user,UserData,as_user,as_service_provider,types } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {
  console.log("================",req.body)

  const { password, username } = req.body;

  if (!username || !password) {
    return res.status(400).json({ "message": "Enter username and password" });
  }

  try {
    // Check if the username already exists
    const role=[];
    const checkUsername = await user.findOne({
      where: {
        username: username,
      },include:[UserData]
    });

    const userRoles=await UserData.findOne({
      where: {
        username: username,
      },include:[as_user,as_service_provider]
    });

    if (userRoles.as_user) {
      role.push("user");
    }
    
    if (userRoles.as_service_provider) {
      role.push("serviceProvider");
    }

    
  
    if (!checkUsername) {
        return res.status(400).json({ "message": "Invalid user" });
    } else {
      try {
        // Encrypt the password
        const match = await bcrypt.compare(password, checkUsername.password);

        if (match) {
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": checkUsername.username,
                        "roles":role   
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );
            const refreshToken = jwt.sign(
                { "username": checkUsername.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1000d' }
            );

            try {
                await user.updateUserRefreshToken(checkUsername.id, refreshToken);

                res.cookie('jwt', refreshToken, {
                    maxAge: 24 * 60 * 60 * 1000, // Cookie will expire in 1 day
                    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
                });


                
              
                return res.status(201).json({ accessToken,"roles":role});
            } catch (err) {
                return res.sendStatus(500);
            }
        } else {
            return res.status(400).json({ "message": "Wrong user credentials" });
        }
        
      } catch (err) {
        return res.status(500).json({ 'message': err.message });
      }
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json({ "message": "Internal server error" });
  }
};

module.exports = {
    handleLogin,
};
