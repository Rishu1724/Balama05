const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection with your new credentials
const uri = "mongodb+srv://rishukumar1724rr_db_user:95KLe8FKh85mJzIQ@cluster0.jmngfes.mongodb.net/marketplace?retryWrites=true&w=majority";

async function testConnection() {
  let client;
  try {
    console.log('Attempting to connect to MongoDB with URI:', uri.replace(/:[^:@]+@/, ':***@')); // Hide password in logs
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: false,
      },
      tls: true,
      tlsInsecure: true,
      directConnection: false,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000
    });
    
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    // Ping the database
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // List databases
    const databases = await client.db().admin().listDatabases();
    console.log('Databases:', databases.databases.map(db => db.name));
    
    // List collections in marketplace database
    const db = client.db("marketplace");
    const collections = await db.listCollections().toArray();
    console.log('Collections in marketplace:', collections.map(col => col.name));
    
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.cause) {
      console.error("Error cause:", error.cause);
    }
    console.error("Full error:", error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

testConnection();