const {UserData,as_service_provider,types,createAppointment}=require('../models');


function hasAllProperties(obj, properties) {
    for (const property of properties) {
      if (!(property in obj)) {
        return false;
      }
    }
    return true;
  }

  
const handlecreateAppointment=async(req,res)=>{

    const requiredProperties=["from_time","to_time","desc","cost","type"];

    const checkAllProperties=hasAllProperties(req.body,requiredProperties);

    if(!checkAllProperties){
        return res.status(400).json({ "message": "Enter all properties" });
    }
    try{
    const username=req.user;

    const user=await UserData.findOne({
        where:{
            username:username 
        },include:[as_service_provider]
    }
    );

    const type=await types.findOne({
        where:{
            type:req.body.type
        }
    })

    const appointment={
        username: username,
        from_time: req.body.from_time,
        to_time:req.body.to_time,
        at: user.coordinates,
        desc: req.body.desc,
        cost: req.body.cost,
        serviceProviderId:user.as_service_provider.id,
        userDataId:user.id,
        typeId:type.id
    }

    createAppointment.createAppointmentMethod(appointment).then((newAppoint)=>{
        return res.status(200).json({"message":newAppoint,"m":user})
    }).catch((err)=>{
        return res.status(400).json({"message":err,"m":user});
    })

}catch(err){
    return res.status(400).json({"message":err,"m":user});
}

}


module.exports={handlecreateAppointment};