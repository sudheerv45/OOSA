// models/Visit.js
const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pgId: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "PG",
        // required: true,
    },
    visitType: {
        type: String,
        enum: ["Physical", "Video Call"],
        required: true,
    },
    sharingType: {
        type: String,
        enum: ["Single Sharing", "Double Sharing", "Triple Sharing", "Couple/Co-Living"],
        required: true,
    },
    roomType: {
        type: String,
        enum: ["AC", "Non-AC"],
        required: true,
    },
    visitDate: {
        type: Date,
        required: true,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Visit", visitSchema);
