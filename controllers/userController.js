const User = require('../models/User');

// Create User
const createUser = async (req, res) => {
  try {
    const { name, mobileNumber, whatsappNumber, isWhatsAppSameAsMobile, address, gender, occupation, identificationType } = req.body;

    // Assign WhatsApp number based on the checkbox
    const finalWhatsAppNumber = isWhatsAppSameAsMobile === 'true' ? mobileNumber : whatsappNumber;

    // Get uploaded file paths for images
    const frontImage = req.files.frontImage ? req.files.frontImage[0].path : null;
    const backImage = req.files.backImage ? req.files.backImage[0].path : null;
    const candidatePhoto = req.files.candidatePhoto ? req.files.candidatePhoto[0].path : null;

    // Create a new user
    const newUser = new User({
      name,
      mobileNumber,
      whatsappNumber: finalWhatsAppNumber,
      isWhatsAppSameAsMobile,
      address,
      gender,
      occupation,
      identificationType,
      images: {
        frontImage,
        backImage,
      },
      candidatePhoto,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ messsage:"Users retrived Succesfully" ,users});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User by ID
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the user ID from request params
    const {
      name,
      mobileNumber,
      whatsappNumber,
      isWhatsAppSameAsMobile,
      address,
      gender,
      occupation,
      identificationType,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.name = name || user.name;
    user.mobileNumber = mobileNumber || user.mobileNumber;

    // Handle `isWhatsAppSameAsMobile` logic
    user.isWhatsAppSameAsMobile =
      isWhatsAppSameAsMobile === 'true' || isWhatsAppSameAsMobile === true;
    user.whatsappNumber =
      user.isWhatsAppSameAsMobile ? user.mobileNumber : whatsappNumber || user.whatsappNumber;

    user.address = address || user.address;
    user.gender = gender || user.gender;
    user.occupation = occupation || user.occupation;
    user.identificationType = identificationType || user.identificationType;

    // Update image fields if new files are uploaded
    if (req.files) {
      if (req.files.frontImage) {
        user.images.frontImage = req.files.frontImage[0].path;
      }
      if (req.files.backImage) {
        user.images.backImage = req.files.backImage[0].path;
      }
      if (req.files.candidatePhoto) {
        user.candidatePhoto = req.files.candidatePhoto[0].path;
      }
    }

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: 'User updated successfully!',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUser,
};
