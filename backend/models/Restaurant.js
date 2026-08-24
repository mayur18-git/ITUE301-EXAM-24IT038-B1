const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      trim: true,
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine type is required"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
