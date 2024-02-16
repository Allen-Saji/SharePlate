const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    authId: {
      type: String,
      required: [true, "Please add auth id!"],
      unique: true,
    },
    latitude: {
      type: String,
      required: [true, "Please add a latitude!"],
    },
    longitude: {
      type: String,
      required: [true, "Please add a longitude!"],
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
