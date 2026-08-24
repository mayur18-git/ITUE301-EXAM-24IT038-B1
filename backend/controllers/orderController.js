const Order = require("../models/Order");

// POST /api/v1/orders - create a new order (protected)
const createOrder = async (req, res, next) => {
  try {
    const { restaurantId, items, totalAmount, deliveryAddress } = req.body;

    // req.user is set by authGuard middleware
    const order = await Order.create({
      customerId: req.user.id,
      restaurantId,
      items,
      totalAmount,
      deliveryAddress,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    next(error); // Mongoose validation errors go to errorHandler
  }
};

// GET /api/v1/orders - get orders for the logged-in customer (protected)
// T5: Uses populate() to join Customer and Restaurant data
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user.id })
      .populate("customerId", "name email")       // T5: populate customer name & email
      .populate("restaurantId", "name cuisine");  // T5: populate restaurant name & cuisine

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/orders/:id/status - update order status (protected)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true } // runValidators ensures enum check runs
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, updateOrderStatus };
