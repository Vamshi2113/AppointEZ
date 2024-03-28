


const authHandler = (req,res) => {

    if (!(req.user)&&!(req.roles)) return res.sendStatus(401);

    return res.status(201).json({'user':req.user});
  }

  module.exports = {
    authHandler
  };    



