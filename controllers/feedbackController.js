const Feedback = require('../models/Feedback');

// Submit feedback
const submitFeedback = async (req, res) => {
  const { experienceRating, improvementSuggestions } = req.body;

  try {
    const feedback = new Feedback({
      experienceRating,
      improvementSuggestions,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json({
      message: 'Thank you for your feedback!',
      feedback: savedFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting feedback.',
      error: error.message,
    });
  }
};

// Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Latest feedback first
    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching feedback.',
      error: error.message,
    });
  }
};

module.exports = {submitFeedback, getAllFeedback};