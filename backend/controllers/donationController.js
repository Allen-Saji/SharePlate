const Donation = require("../models/donationModel");
const { getLastDonation } = require("./resourceController");

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    getLastDonation();
    res.status(201).json({
      status: "success",
      data: {
        donation,
      },
    });
  } catch (err) {
    res.json({
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

// Function to get all recent donations associated with a charity id
exports.getRecentDonationsForCharity = async (req, res) => {
  try {
    const charityId = req.params.charityId; // Assuming the charity id is passed as a route parameter

    // Find all recent donations associated with the given charity id
    const recentDonations = await Donation.find({ charity_ids: charityId })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order to get the most recent donations first
      .limit(10); // Limit the number of donations returned, you can adjust this as needed

    res.status(200).json({
      status: "success",
      data: {
        donations: recentDonations,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
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

// Get all donations for the current date
exports.getDonationsForCurrentDate = async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );

    const donations = await Donation.find({
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        donations,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
