const {createAppointment ,as_service_provider, UserData,bookedAppointments } = require("../models");

const handleDeleteService = async (req, res) => {
  const username = req.user;
  const id=req.params.id;

  try {
    const myService = await createAppointment.findOne({
        where:{
            username:username,
            id:id
        },include:[
          bookedAppointments
        ]
    });

    if(myService){
      if(!(myService.bookedAppointments.length === 0)){
        return res.status(400).json({ 'message': 'Clear Clients First'});
      }
        await myService.destroy();
        return res.status(200).json({ 'message': 'deleted Service'});
    }else{
       return res.status(400).json({ 'message': 'Operation failed'}); 
    }

  } catch (err) {
    return res.status(500).json({ 'message': err.message });
  }
};

module.exports = {
  handleDeleteService,
};
