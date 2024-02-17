const express = require("express");
const router = express.Router();
const {
  createSupplier,
  findUserByAuthId,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");
const { createDonation } = require("../controllers/donationController");

router.post("/supplier", createSupplier);
router.get("/supplier/:authId", findUserByAuthId);
router.post("/supplier/donation", createDonation);

module.exports = router;
