const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

// MongoDB connection using environment variable
const uri = process.env.MONGODB_URI || "mongodb+srv://rishukumar1724rr_db_user:95KLe8FKh85mJzIQ@cluster0.jmngfes.mongodb.net/marketplace?retryWrites=true&w=majority";

console.log('Attempting to connect to MongoDB...');

// Configure Mongoose connection options
const options = {
  // SSL options
  tls: true,
  tlsInsecure: true, // Allow insecure TLS connections
  // Connection pool options
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  // Retry options
  retryWrites: true,
};

mongoose.connect(uri, options)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test a simple operation
    const db = mongoose.connection;
    db.db.listCollections().toArray()
      .then(collections => {
        console.log('Available collections:', collections.map(c => c.name));
        console.log('🎉 MongoDB is working correctly!');
        process.exit(0);
      })
      .catch(err => {
        console.log('Connected to MongoDB but encountered an error:', err.message);
        process.exit(1);
      });
  })
  .catch(error => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });