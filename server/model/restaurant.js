const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    pin: { type: String },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
