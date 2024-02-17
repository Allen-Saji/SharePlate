const express = require("express");
const router = express.Router();
const { createCharity } = require("../controllers/charityController");

router.post("/charity", createCharity);

module.exports = router;
