// Assuming you have something like this in register.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/signupController.js');

router.post('/', authController.handleNewUser);

module.exports = router;
