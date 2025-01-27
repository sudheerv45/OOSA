// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PG",
        // required: true,
    },
    bookingType: {
        type: String,
        enum: ["Daily", "Monthly"],
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: function () {
            return this.bookingType === "Daily";
          }
    },
    sharingType: {
        type: String,
        enum: ["Single Sharing", "Double Sharing", "Triple Sharing", "Couple/Co-living"],
        required: true,
    },
    roomType: {
        type: String,
        enum: ["AC", "Non-AC"],
        required: true,
    },
    room: {
        type: String,
        default: "Single Room",
    },
    paymentType: {
        type: String,
        enum: ["Full", "Partial Amount", "At PG"],
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["PhonePay", "Gpay", "Credit/ATM Card", "UPI ID"],
        required: true,
    },
    amount: {
        type: Number,
        required: function() {
            return this.paymentType === "Partial Amount";
        },
    },  
},
 {
    timestamps: true
 });

module.exports = mongoose.model("Booking", bookingSchema);
