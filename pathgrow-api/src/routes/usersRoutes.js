const express = require('express');

const userController = require('../controller/usersController');
const router = express.Router();

router.get('/', userController.getAllUsers);            // GET all users
router.patch('/:userID', userController.updateUser);    // UPDATE user
router.delete('/:userID', userController.deleteUser);   // DELETE user

module.exports = router;