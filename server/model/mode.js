const mongoose = require("mongoose");

const modeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mode", modeSchema);
