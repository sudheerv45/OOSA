const Owner = require('../models/Owner');

// Create a new Owner
const createOwner = async (req, res) => {
    try {
        const { ownerName, phoneNo, altPhoneNo, emailId, gender } = req.body;

        // Validation: check if phoneNo or emailId already exists
        const existingOwner = await Owner.findOne({ $or: [{ phoneNo }, { emailId }] });
        if (existingOwner) {
            return res.status(400).json({ message: 'Phone number or Email ID already exists' });
        }

        // Create new Owner
        const newOwner = new Owner({ ownerName, phoneNo, altPhoneNo, emailId, gender });
        await newOwner.save();
        return res.status(201).json({ message: 'Owner created successfully', owner: newOwner });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all Owners
const getAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.status(200).json({ owners });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Owner by ID
const getOwnerById = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        res.status(200).json({ owner });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Owner
const updateOwner = async (req, res) => {
    try {
        const { ownerName, phoneNo, altPhoneNo, emailId, gender } = req.body;

        // Check if the Owner exists
        const owner = await Owner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        // Update Owner details
        owner.ownerName = ownerName || owner.ownerName;
        owner.phoneNo = phoneNo || owner.phoneNo;
        owner.altPhoneNo = altPhoneNo || owner.altPhoneNo;
        owner.emailId = emailId || owner.emailId;
        owner.gender = gender || owner.gender;

        await owner.save();
        res.status(200).json({ message: 'Owner updated successfully', owner });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Owner
const deleteOwner = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        await owner.remove();
        res.status(200).json({ message: 'Owner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createOwner,
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner,
};
