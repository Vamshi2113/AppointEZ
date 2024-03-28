// Assuming you have something like this in register.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/signupController.js');
const { handleGetSignup } = require('../controllers/signUpPageController.js');

router.post('/', authController.handleNewUser);
router.get('/',handleGetSignup)

module.exports = router;
