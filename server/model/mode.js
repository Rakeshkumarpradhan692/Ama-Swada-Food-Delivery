const mongoose = require("mongoose");

const modeSchema = new mongoose.Schema(
  {
    isVeg: {
      type: Boolean,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mode", modeSchema);
