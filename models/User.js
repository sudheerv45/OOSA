const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    isWhatsAppSameAsMobile: {
      type: Boolean,
      default: false, // Default is unchecked
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    occupation: {
      type: String,
      enum: ['employee', 'student', 'other'],
      required: true,
    },
    identificationType: {
      type: String,
      enum: ['Aadhaar card', 'PAN card', 'Voter ID', 'Driving License'],
      required: true,
    },
    images: {
      frontImage: String,
      backImage: String,
    },
    candidatePhoto: String,
  },
  {
    timestamps: true,
  }
);

// Middleware to update `whatsappNumber` if `isWhatsAppSameAsMobile` is true
userSchema.pre('save', function (next) {
  if (this.isWhatsAppSameAsMobile) {
    this.whatsappNumber = this.mobileNumber;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
