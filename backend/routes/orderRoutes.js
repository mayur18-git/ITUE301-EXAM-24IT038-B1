const express = require("express");
const { createOrder, getMyOrders, updateOrderStatus } = require("../controllers/orderController");
const authGuard = require("../middleware/authGuard");

const router = express.Router();

// All order routes are protected with authGuard middleware
router.post("/", authGuard, createOrder);
router.get("/", authGuard, getMyOrders);
router.patch("/:id/status", authGuard, updateOrderStatus);

module.exports = router;
