const express = require("express");
const router = express.Router();
const {
  createCharity,
  findUserByAuthId,
} = require("../controllers/charityController");

router.post("/charity", createCharity);
router.get("/charity/:authId", findUserByAuthId);
module.exports = router;
