
const express=require('express');
const verifyRoles = require('../middleware/verifyRoles');
const { handleMyAppointments } = require('../controllers/myAppointmentsController');
const { handlefindAppointments } = require('../controllers/findAppointmentsController');
const router = express.Router();

router.get('/myAppointments',verifyRoles('user'),handleMyAppointments);
router.get('/findAppointments',verifyRoles('user','serviceProvider'),handlefindAppointments);

module.exports = router;