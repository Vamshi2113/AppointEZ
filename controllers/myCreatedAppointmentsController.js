
const { json } = require('sequelize');
const {createAppointment,as_service_provider}=require('../models');
const handleMyCreatedAppointments=async (req,res)=>{
    const username=req.user;
    try{

        const serviceProvider = await as_service_provider.findOne({
            where: {
              username: username
            },include:[createAppointment]// Corrected model name
          });

    if(!serviceProvider){
        return res.status(400).json({'message':'no privilages to see or create'});
    }
    console.log(serviceProvider)

    return res.status(200).json({'message':serviceProvider.createAppointments})

}catch(err){
    return res.status(400).json({'err':err})
}
    
}

module.exports={
    handleMyCreatedAppointments
}

