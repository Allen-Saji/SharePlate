const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: [true, "Please add a supplier ID"],
    },
    itemName: {
      type: String,
      required: [true, "Please add an item name"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Please add an expiry date"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
