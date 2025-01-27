const Incharge = require('../models/Incharge');
const Branch = require('../models/Branch');
const bcrypt = require('bcryptjs');

// Create a new incharge
const createIncharge = async (req, res) => {
    try {
        const { inchargeName, phoneNumber, password, confirmPassword, branchId } = req.body;

        // Check if the passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if branch exists
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(400).json({ message: 'Branch not found' });
        }

        // Check if the phone number is unique
        const existingIncharge = await Incharge.findOne({ phoneNumber });
        if (existingIncharge) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        // Create and save the incharge
        const incharge = new Incharge({
            inchargeName,
            phoneNumber,
            password,
            branch: branchId
        });

        await incharge.save();
        res.status(201).json({ message: 'Incharge created successfully', incharge });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get all incharges
const getAllIncharges = async (req, res) => {
    try {
        const incharges = await Incharge.find().populate('branch', 'branchName');
        res.status(200).json(incharges);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get an incharge by ID
const getInchargeById = async (req, res) => {
    try {
        const incharge = await Incharge.findById(req.params.id).populate('branch', 'branchName');
        if (!incharge) {
            return res.status(404).json({ message: 'Incharge not found' });
        }
        res.status(200).json(incharge);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update incharge
const updateIncharge = async (req, res) => {
    try {
        const inchargeId = req.params.id;
        const updateData = req.body;

        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const incharge = await Incharge.findByIdAndUpdate(inchargeId, updateData, { new: true });
        if (!incharge) {
            return res.status(404).json({ message: 'Incharge not found' });
        }
        res.status(200).json({ message: 'Incharge updated successfully', incharge });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete an incharge
const deleteIncharge = async (req, res) => {
    try {
        const inchargeId = req.params.id;
        const incharge = await Incharge.findByIdAndDelete(inchargeId);
        if (!incharge) {
            return res.status(404).json({ message: 'Incharge not found' });
        }
        res.status(200).json({ message: 'Incharge deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createIncharge,
    getAllIncharges,
    getInchargeById,
    updateIncharge,
    deleteIncharge
};
