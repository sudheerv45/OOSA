const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup); // Send OTP
router.post('/verify-otp', authController.verifyOtp); // Verify OTP
router.post('/resend-otp', authController.resendOtp); // Resend OTP

module.exports = router;
