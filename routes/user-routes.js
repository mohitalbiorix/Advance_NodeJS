const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const checkAuthUser = require('../middleware/auth.middleware');


// public route
router.post('/register', userController.userRegistartion);
router.post('/login', userController.userLogin);
router.post('/send-reset-password-email', userController.sendUserPasswordResetMail);
router.post('/reset-password/:id/:token', userController.userPasswordReset)

// protected route
router.post('/changePassword', checkAuthUser,userController.changeUserPassword);
router.get('/loggeduser', checkAuthUser, userController.loggedUser)

module.exports = router;