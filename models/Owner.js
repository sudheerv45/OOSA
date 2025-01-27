const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Please enter a valid phone number'], // For 10-digit phone numbers
    },
    altPhoneNo: {
        type: String,
        match: [/^\d{10}$/, 'Please enter a valid alternate phone number'], // Optional alternate phone number
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Optional enum for gender
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Owner', ownerSchema);
