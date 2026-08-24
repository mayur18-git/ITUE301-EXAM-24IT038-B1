const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

// POST /api/v1/auth/login
// Creates customer if not found, returns JWT token
const login = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find existing customer or create a new one
    let customer = await Customer.findOne({ email });

    if (!customer) {
      customer = await Customer.create({
        email,
        name: name || email.split("@")[0], // Use part before @ as default name
      });
    }

    // Sign JWT with customer id and email, expires in 24 hours
    const token = jwt.sign(
      { id: customer._id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
      },
      token,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

module.exports = { login };
