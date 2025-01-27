// controllers/bookingController.js
const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
    try {
        const { userId, pgId, bookingType, checkInDate, checkOutDate, sharingType, roomType, room, paymentType, paymentMethod, amount } = req.body;

        // Validate amount if paymentType is "Partial Amount"
        if (paymentType === "Partial Amount" && (amount === undefined || amount <= 0)) {
            return res.status(400).json({ message: "Amount is required and must be greater than 0 for partial payments." });
        }

        const booking = new Booking({
            userId,
            pgId,
            bookingType,
            checkInDate,
            checkOutDate,
            sharingType,
            roomType,
            room,
            paymentType,
            paymentMethod,
            amount: paymentType === "Partial Amount" ? amount : undefined,
        });

        await booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
// Get All Bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("userId", "name").populate("pgId", "pgName");
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Booking by ID
const getBookingById = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId).populate("userId", "name").populate("pgId", "pgName");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ booking });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update Booking
const updateBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { bookingType, checkInDate, checkOutDate, sharingType, roomType, room, paymentType, paymentMethod, amount } = req.body;

        // Find the booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Validate amount if paymentType is "Partial Amount"
        if (paymentType === "Partial Amount" && (amount === undefined || amount <= 0)) {
            return res.status(400).json({ message: "Amount is required and must be greater than 0 for partial payments." });
        }

        // Update booking fields only if they are provided in the request body
        if (bookingType) booking.bookingType = bookingType;
        if (checkInDate) booking.checkInDate = new Date(checkInDate);
        if (checkOutDate) booking.checkOutDate = new Date(checkOutDate);
        if (sharingType) booking.sharingType = sharingType;
        if (roomType) booking.roomType = roomType;
        if (room) booking.room = room;
        if (paymentType) booking.paymentType = paymentType;
        if (paymentMethod) booking.paymentMethod = paymentMethod;

        // Set the amount only if paymentType is "Partial Amount"
        booking.amount = paymentType === "Partial Amount" ? amount : undefined;

        await booking.save();
        res.status(200).json({ message: "Booking updated successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Booking
const deleteBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
module.exports = {createBooking,getAllBookings, getBookingById, updateBooking, deleteBooking};