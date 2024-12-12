const express = require('express');

const userController = require('../controller/usersController');
const router = express.Router();

// CREATE - POST method
router.post('/', userController.createNewUser);


// READ - GET method
router.get('/', userController.getAllUsers);

// UPDATE - PATCH method
router.patch('/:userID', userController.updateUser);

// DELETE - DELETE method
router.delete('/:userID', userController.deleteUser);



module.exports = router;