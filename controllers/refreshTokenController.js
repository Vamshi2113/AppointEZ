const {user} = require("../models");


const handleRefresh=async (req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = user.findByRefreshToken(refreshToken);
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

            res.cookie('jwt', accessToken, {
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