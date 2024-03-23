

const {bookedAppointments,createAppointment,as_service_provider,as_user}=require('../models');

const handleBookAppointment=async (req,res)=>{
    const id=req.params.id;
    const username=req.user
    try{
        const appointment = await createAppointment.findOne({where:{id},include:[as_service_provider]});
        const user=await as_user.findOne({
            where: {
              username: username
            }// Corrected model name
          });

        const bookedappointment = await bookedAppointments.createEntry('active', appointment.id, user.id, appointment.as_service_provider.id)
        

    if(!bookedappointment){
        return res.status(400).json({'message':'failed to book'});
    }

    return res.status(200).json({'message':'success'});

}catch(err){
    return res.status(400).json({'err':err})
}
    
}

module.exports={
    handleBookAppointment
}









