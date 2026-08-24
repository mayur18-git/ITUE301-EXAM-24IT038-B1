require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// --- Middleware (order matters) ---

// Allow requests from Vite frontend
app.use(cors({ origin: "http://localhost:5173" }));

// Parse incoming JSON bodies
app.use(express.json());

// T3: Request logger applied globally - logs every request
app.use(requestLogger);

// --- Routes ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/orders", orderRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ success: true, message: "QuickBite API is running" });
});

// T3: Global error handler - MUST be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
