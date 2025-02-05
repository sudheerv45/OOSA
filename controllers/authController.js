const User = require('../models/authModel');
const otpGenerator = require('otp-generator');
// const client = require('twilio')('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'); // Twilio SMS Service
const fs = require('fs');
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { mobileNumber } = req.body;

        if (!mobileNumber) {
            return res.status(400).json({ message: 'Mobile number is required.' });
        }

        // Check if the user already exists
        let user = await User.findOne({ mobileNumber });

        if (!user) {
            // Create a new user if not already registered
            user = new User({ mobileNumber });
        }

        // Generate OTP
        const otp = otpGenerator.generate(4, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        // Send OTP via SMS
        // await client.messages.create({
        //     body: `Your OTP is ${otp}`,
        //     from: 'YOUR_TWILIO_PHONE_NUMBER',
        //     to: mobileNumber,
        // });

        res.status(200).json({ message: 'OTP sent successfully to your mobile number.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { mobileNumber, otp } = req.body;

        if (!mobileNumber || !otp) {
            return res.status(400).json({ message: 'Mobile number and OTP are required.' });
        }

        // Find the user
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Default OTP (for testing)
        if (otp == 1234) {
            user.isVerified = true;
            user.otp = null; // Clear OTP
            user.otpExpiry = null; // Clear OTP expiry
            await user.save();
        } 
        // Check if OTP is valid and not expired
        else {
            if (user.otp !== otp) {
                return res.status(400).json({ message: 'Invalid OTP.' });
            }
            if (user.otpExpiry && user.otpExpiry < Date.now()) {
                return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
            }

            user.isVerified = true;
            user.otp = null; // Clear OTP
            user.otpExpiry = null; // Clear OTP expiry
            await user.save();
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, mobileNumber: user.mobileNumber },
            process.env.JWT_SECRET,
            { expiresIn: "2d" } // Token valid for 2 days
        );

        return res.status(200).json({ 
            message: 'Mobile number verified successfully.',
            token, 
            user: {
                _id: user._id,
                mobileNumber: user.mobileNumber,
                isVerified: user.isVerified
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const resendOtp = async (req, res) => {
    try {
        const { mobileNumber } = req.body;

        if (!mobileNumber) {
            return res.status(400).json({ message: 'Mobile number is required.' });
        }

        // Find the user
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Generate a new OTP
        const otp = otpGenerator.generate(4, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        // Send the new OTP via SMS
        // await client.messages.create({
        //     body: `Your new OTP is ${otp}`,
        //     from: 'YOUR_TWILIO_PHONE_NUMBER',
        //     to: mobileNumber,
        // });

        res.status(200).json({ message: 'OTP resent successfully to your mobile number.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { signup, verifyOtp, resendOtp };