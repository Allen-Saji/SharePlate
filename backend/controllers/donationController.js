const Donation = require("../models/donationModel");

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        donation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update an existing donation
exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!donation) {
      return res.status(404).json({
        status: "fail",
        message: "Donation not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        donation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete a donation
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({
        status: "fail",
        message: "Donation not found",
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
