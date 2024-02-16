const mongoose = require("mongoose");

const charitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    registrationCertificate: {
      type: String,
      required: [true, "Please upload a registration certificate!"],
    },
    location: {
      type: String,
      required: [true, "Please add a location!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add a phone number!"],
    },
    email: {
      type: String,
      required: [true, "Please add an email!"],
      unique: true,
    },
    capacity: {
      type: Number,
      required: [true, "Please add capacity!"],
    },
    vegCount: {
      type: Number,
      required: [true, "Please add a count for vegetarians!"],
    },
    nonVegCount: {
      type: Number,
      required: [true, "Please add a count for non-vegetarians!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Charity", charitySchema);