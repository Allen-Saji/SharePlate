const express = require("express");
const router = express.Router();
const {
  createCharity,
  findUserByAuthId,
} = require("../controllers/charityController");
const {
  getRecentDonationsForCharity,
} = require("../controllers/donationController");

router.post("/charity", createCharity);
router.get("/charity/:authId", findUserByAuthId);
router.get("/charity/donations/:charityId", getRecentDonationsForCharity);
module.exports = router;
