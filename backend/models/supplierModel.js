const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name!"],
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
    aadharNumber: {
      type: String,
      required: [true, "Please add an Aadhar number!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Supplier", supplierSchema);
