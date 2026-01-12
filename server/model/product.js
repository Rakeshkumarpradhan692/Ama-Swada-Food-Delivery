const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    // 🔹 Multiple quantity + price
    variants: [
      {
        quantity: {
          type: String,
          required: true, // Half, Full, 250gm
        },
        price: {
          type: Number,
          required: true,
        },
        discountedPrice: {
          type: Number,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
      },
    ],

    // 🧾 GST Percentage
    gst: {
      type: Number, // e.g. 5, 12, 18
      default: 0,
      min: 0,
    },

    // 🍽️ Stock
    platesAvailable: {
      type: Number,
      default: 0,
      min: 0,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    // 🔗 Relations
    mode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mode",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    // ➕ Add-ons
    addons: [
      {
        name: String,
        price: Number,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
