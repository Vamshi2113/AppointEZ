


const {createAppointment}=require('../models');

const handlefindAppointments=async (req,res)=>{
    const username=req.user;
    try{
        
        const services = await createAppointment.findAll()

    if(!services){
        return res.status(400).json({'message':'no privilages to see or create'});
    }

    return res.status(200).json({'message':services});

}catch(err){
    return res.status(400).json({'err':err})
}
    
}

module.exports={
    handlefindAppointments
}

