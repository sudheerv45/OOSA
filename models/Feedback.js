const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    experienceRating: {
      type: String,
      enum: ['Terrible', 'Bad', 'Okay', 'Good', 'Amazing'],
    //   required: [true, 'Experience rating is required.'],
    },
    improvementSuggestions: {
      type: String,
    //   required: [true, 'Improvement suggestions are required.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
