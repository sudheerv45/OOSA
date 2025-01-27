const Branch = require('../models/Branch');
const Owner = require('../models/Owner');

// Create a new branch
const createBranch = async (req, res) => {
    try {
        const { ownerId, branchName, hostelType, hostelName, address, landmark, state, city, pincode, contactNo1, contactNo2, location } = req.body;

        // Check if owner exists
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(400).json({ message: 'Owner not found' });
        }

        const newBranch = new Branch({
            ownerId,
            branchName,
            hostelType,
            hostelName,
            address,
            landmark,
            state,
            city,
            pincode,
            contactNo1,
            contactNo2,
            location
        });

        await newBranch.save();
        res.status(201).json({ message: 'Branch added successfully', branch: newBranch });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get all branches
const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find().populate('ownerId', 'ownerName');
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get a branch by ID
const getBranchById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id).populate('ownerId', 'ownerName');
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update a branch
const updateBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        const updateData = req.body;

        const branch = await Branch.findByIdAndUpdate(branchId, updateData, { new: true });
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json({ message: 'Branch updated successfully', branch });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete a branch
const deleteBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        const branch = await Branch.findByIdAndDelete(branchId);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch
};
