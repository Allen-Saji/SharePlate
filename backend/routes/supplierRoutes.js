const express = require("express");
const router = express.Router();
const {
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");
const { createDonation } = require("../controllers/donationController");

router.post("/supplier", createSupplier);
router.post("/supplier/donation", createDonation);

module.exports = router;
