const Visit = require("../models/Visit");

// Schedule a Visit
const scheduleVisit = async (req, res) => {
    try {
        const { userId, pgId, visitType, sharingType, roomType, visitDate } = req.body;

        const visit = new Visit({
            userId,
            pgId,
            visitType,
            sharingType,
            roomType,
            visitDate,
        });

        await visit.save();
        res.status(201).json({ message: "Visit scheduled successfully", visit });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Visits
const getAllVisits = async (req, res) => {
    try {
        const visits = await Visit.find().populate("userId", "name").populate("pgId", "pgName");
        res.status(200).json({ visits });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getVisitById = async (req, res) => {
    try {
      const { visitId } = req.params;
      const visit = await Visit.findById(visitId).populate("userId", "name").populate("pgId", "pgName");
  
      if (!visit) {
        return res.status(404).json({ message: "Visit not found" });
      }
  
      res.status(200).json({ visit });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };  

// Update Visit
const updateVisit = async (req, res) => {
    try {
        const { visitId } = req.params;
        const updates = req.body;

        const visit = await Visit.findByIdAndUpdate(visitId, updates, { new: true });
        if (!visit) {
            return res.status(404).json({ message: "Visit not found" });
        }

        res.status(200).json({ message: "Visit updated successfully", visit });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Visit
const deleteVisit = async (req, res) => {
    try {
        const { visitId } = req.params;

        const visit = await Visit.findByIdAndDelete(visitId);
        if (!visit) {
            return res.status(404).json({ message: "Visit not found" });
        }

        res.status(200).json({ message: "Visit deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
module.exports = {scheduleVisit, updateVisit, getAllVisits, deleteVisit, getVisitById};