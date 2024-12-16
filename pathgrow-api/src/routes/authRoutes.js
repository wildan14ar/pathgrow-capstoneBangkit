const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

// Register and Login endpoints
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
