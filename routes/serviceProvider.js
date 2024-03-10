const {handleJoinAsServiceProvider } = require('../controllers/joinAsServiceProviderController');
const createAppointmentController=require('../controllers/createAppointmentController')
const express=require('express');
const router = express.Router();

router.get('/join',handleJoinAsServiceProvider);
router.post('/createAppointment',createAppointmentController.handlecreateAppointment);

module.exports = router;