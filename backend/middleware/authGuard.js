const jwt = require("jsonwebtoken");

// T3: Auth guard middleware - protects routes using JWT
const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is required",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    // Verify token using JWT_SECRET from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request object
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authGuard;
