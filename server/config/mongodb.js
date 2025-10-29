const mongoose = require('mongoose');

// MongoDB connection using environment variable
// For local development, you can use a local MongoDB instance
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/marketplace";

let isConnected = false;

// Function to connect to MongoDB using Mongoose
async function connectToMongo() {
  try {
    if (!isConnected) {
      // Configure Mongoose connection options
      const options = {
        // Connection pool options
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,
        // Retry options
        retryWrites: true,
      };

      await mongoose.connect(uri, options);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      isConnected = true;
    }
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    isConnected = false;
    return null;
  }
}

// Function to get database instance
function getDB() {
  return mongoose.connection.db;
}

// Function to check if connected
function isConnectedToDB() {
  return isConnected;
}

// Export functions
module.exports = {
  connectToMongo,
  getDB,
  isConnectedToDB
};