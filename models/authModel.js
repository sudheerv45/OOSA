const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
    {
        mobileNumber: { type: String, required: true, unique: true },
        otp: { type: String }, // Store OTP temporarily
        otpExpiry: { type: Date }, // OTP expiration time
        isVerified: { type: Boolean, default: false }, // Verification status
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

module.exports = mongoose.model('Auth', authSchema);
