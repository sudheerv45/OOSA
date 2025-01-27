const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
    branchName: {
        type: String,
        required: true,
    },
    hostelType: {
        type: String,
        enum: ['PG(Male)', 'PG(Female)', 'CO-Living(Couples)'],
        required: true,
    }, 
    hostelName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    contactNo1: {
        type: String,
        required: true,
    },
    contactNo2: {
        type: String,
    },
    location: {
        type: {
            lat: Number,
            lng: Number
        },
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', branchSchema);
