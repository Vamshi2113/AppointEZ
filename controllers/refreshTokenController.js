const {user} = require("../models");

const jwt = require('jsonwebtoken');


const handleRefresh=async (req,res)=>{
    console.log("cookie=================''''''")

    const cookies = req.cookies;
    console.log("cookie",cookies);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log("cookie=================",cookies.jwt)

    const foundUser = await user.findByRefreshToken(refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    console.log("====================\\")
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            console.log("====================\\")
            // const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );

            res.cookie('jwt', refreshToken, {
                maxAge: 24 * 60 * 60 * 1000, // Cookie will expire in 1 day
                httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
            });
            return res.json({ accessToken })
        }
    );
}

module.exports = {
    handleRefresh,
  };