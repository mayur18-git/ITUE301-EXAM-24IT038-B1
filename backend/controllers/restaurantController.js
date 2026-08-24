const Restaurant = require("../models/Restaurant");

// GET /api/v1/restaurants - returns all restaurants
const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRestaurants };
