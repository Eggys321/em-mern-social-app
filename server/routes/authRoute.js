const express = require("express");
const { registration, login, getUserName, isLoggedIn, forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require('../middleware/auth')


router.post('/register',registration);

router.post('/login',login)

router.get('/getusername',authMiddleware, getUserName);
router.get('/isloggedin',isLoggedIn);
router.post('/forgotpassword',forgotPassword);
router.put('/resetpassword/:resetToken',resetPassword)

module.exports = router;