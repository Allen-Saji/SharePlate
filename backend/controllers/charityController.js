const Charity = require("../models/charityModel");

// Create a new charity
exports.createCharity = async (req, res) => {
  try {
    const charity = await Charity.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        charity,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update an existing charity
exports.updateCharity = async (req, res) => {
  try {
    const charity = await Charity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!charity) {
      return res.status(404).json({
        status: "fail",
        message: "Charity not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        charity,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete a charity
exports.deleteCharity = async (req, res) => {
  try {
    const charity = await Charity.findByIdAndDelete(req.params.id);
    if (!charity) {
      return res.status(404).json({
        status: "fail",
        message: "Charity not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Function to find a user by authId
exports.findUserByAuthId = async (req, res) => {
  try {
    const authId = req.params.authId; // Assuming authId is passed as a URL parameter
    const user = await Charity.findOne({ authId });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// Get all charities
exports.getAllCharities = async (req, res) => {
  try {
    const charities = await Charity.find();
    res.status(200).json({
      status: "success",
      data: {
        charities,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
