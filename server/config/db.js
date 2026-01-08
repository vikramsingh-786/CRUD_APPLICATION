const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI ? "URI found in env" : "URI MISSING");
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected successfully!`);
  } catch (error) {
    console.error(`Detailed Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;