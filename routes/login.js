const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.js');
const { handleGetLogin } = require('../controllers/loginPageController.js');

router.post('/', loginController.handleLogin);
router.get('/',handleGetLogin);

module.exports = router;