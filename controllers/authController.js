const {UserData}=require('../models')


const authHandler = async (req,res) => {

    if (!(req.user)&&!(req.roles)) return res.sendStatus(401);
    const userdata=await UserData.findOne({
      where:{
        username:req.user
      }
    })

    return res.status(201).json({'user':req.user,'credits':userdata.credits});
  }

  module.exports = {
    authHandler
  };    



