
const express=require('express');
const verifyRoles = require('../middleware/verifyRoles');
const { handleMyAppointments } = require('../controllers/myAppointmentsController');
const { handlefindAppointments } = require('../controllers/findAppointmentsController');
const { handleDeleteAppointment } = require('../controllers/deleteUserAppointment');
const { handleBookAppointment } = require('../controllers/bookAppointmentController');
const { handleGetDashboard } = require('../controllers/dashboardPageController');
const router = express.Router();

router.get('/myAppointments',verifyRoles('user'),handleMyAppointments);
router.get('/findAppointments',verifyRoles('user','serviceProvider'),handlefindAppointments);
router.get('/deleteAppointment/:id',verifyRoles('user','serviceProvider'),handleDeleteAppointment)
router.get('/bookAppointment/:id',verifyRoles('user','serviceProvider'),handleBookAppointment)
router.get('/dashboard',verifyRoles('user','serviceProvider'),handleGetDashboard)
module.exports = router;