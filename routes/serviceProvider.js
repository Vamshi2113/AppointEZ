const {handleJoinAsServiceProvider } = require('../controllers/joinAsServiceProviderController');
const createAppointmentController=require('../controllers/createAppointmentController')
const {handleMyCreatedAppointments}=require('../controllers/myCreatedAppointmentsController')
const express=require('express');
const verifyRoles = require('../middleware/verifyRoles');
const { handleDeleteService } = require('../controllers/deleteServiceController');
const { handleMyCurrentClients } = require('../controllers/currentClientsContoller');
const { handleCompleteAppointment } = require('../controllers/completeServiceController');
const router = express.Router();

router.get('/join',verifyRoles('user'),handleJoinAsServiceProvider);
router.post('/createAppointment',verifyRoles('serviceProvider'),createAppointmentController.handlecreateAppointment);
router.get('/myAppointments',verifyRoles('serviceProvider'),handleMyCreatedAppointments);
router.get('/deleteService/:id',verifyRoles('serviceProvider'),handleDeleteService);
router.get('/currentClients',verifyRoles('serviceProvider'),handleMyCurrentClients);
router.get('/completeOrder/:id',verifyRoles('serviceProvider'),handleCompleteAppointment);
router.get('/profile',verifyRoles('serviceProvider'),handleMyCreatedAppointments);
module.exports = router;