
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

    return res.status(200).json({'message':serviceProvider.createAppointment})

}catch(err){
    return res.status(400).json({'err':err})
}
    
}

module.exports={
    handleMyCreatedAppointments
}

