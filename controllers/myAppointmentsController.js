
const {bookedAppointments,createAppointment,as_user,as_service_provider}=require('../models');

const handleMyAppointments=async (req,res)=>{
    const username=req.user;
    try{

        const user = await as_user.findOne({
            where: {
                username: username
            },
            include: [
                {
                    model: bookedAppointments,
                    include: [
                        {
                            model: createAppointment
                        },
                        {
                            model: as_service_provider
                        }
                    ]
                }
            ]
        });
        

    if(!user){
        return res.status(400).json({'message':'no privilages to see or create'});
    }

    return res.status(200).json({'message':user.bookedAppointments});

}catch(err){
    return res.status(400).json({'err':err})
}
    
}

module.exports={
    handleMyAppointments
}

