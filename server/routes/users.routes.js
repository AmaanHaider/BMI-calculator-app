const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const validateToken = require('../middleware/validateToken');

router.get('/',validateToken, userController.currentUser)

router.post('/register',userController.registerUser);


router.post('/login',userController.loginUser)





module.exports = router