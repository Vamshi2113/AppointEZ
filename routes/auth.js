const express = require('express');
const { authHandler } = require('../controllers/authController');
const router = express.Router();


router.get('/',authHandler);

module.exports = router;