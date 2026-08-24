const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Reference to Customer model (T5: Mongoose references)
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer ID is required"],
    },
    // Reference to Restaurant model (T5: Mongoose references)
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant ID is required"],
    },
    items: [
      {
        name: {
          type: String,
          required: [true, "Item name is required"],
          trim: true,
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "preparing", "out-for-delivery", "delivered", "cancelled"],
        message: "Invalid status value",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
