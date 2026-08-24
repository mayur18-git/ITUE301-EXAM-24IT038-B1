// T3: Global error handler - must be registered LAST in server.js
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Handle Mongoose ValidationError - return readable field errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Handle MongoDB duplicate key error (e.g., duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Handle invalid Mongoose ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Generic server error - do NOT expose raw error to frontend
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
