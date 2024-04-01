
const {createAppointment,as_service_provider,bookedAppointments,as_user}=require('../models');

const handleMyCurrentClients=async (req,res)=>{
    const username=req.user;
    try{

        const serviceProvider = await as_service_provider.findOne({
            where: {
              username: username
            },include:[
                {
                    model:createAppointment,
                    include:[
                        {
                            model:bookedAppointments,
                            include:[
                                {
                                    model:as_user
                                }
                            ]
                        }
                    ]
                }
            ]// Corrected model name
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
    handleMyCurrentClients
}

