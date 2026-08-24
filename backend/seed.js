require("dotenv").config();
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");

const sampleRestaurants = [
  { name: "Spice Garden", cuisine: "Indian", rating: 4.5, isOpen: true },
  { name: "Pizza Palace", cuisine: "Italian", rating: 4.2, isOpen: true },
  { name: "Burger Hub", cuisine: "Fast Food", rating: 4.0, isOpen: false },
  { name: "Green Bowl", cuisine: "Healthy", rating: 4.7, isOpen: true },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing restaurant data
    await Restaurant.deleteMany();
    console.log("Old restaurant data cleared.");

    // Insert fresh sample data
    await Restaurant.insertMany(sampleRestaurants);
    console.log("4 restaurants seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
