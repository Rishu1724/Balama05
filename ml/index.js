const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const MLEngine = require('./mlEngine');

dotenv.config();

const app = express();
const PORT = process.env.ML_PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize ML Engine
const mlEngine = new MLEngine();

// Load datasets and "train" models on startup
async function initializeML() {
  try {
    console.log('Initializing ML Engine (simplified)...');
    await mlEngine.initDB();
    
    // Train models
    console.log('Training models...');
    await mlEngine.trainModels();
    
    console.log('ML Engine initialized successfully!');
  } catch (error) {
    console.error('ML Engine initialization failed:', error);
  }
}

// Initialize ML Engine
initializeML();

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Balama ML Engine API',
    status: 'running',
    models: mlEngine.isTrained ? 'trained' : 'not trained'
  });
});

// Train models
app.post('/train', async (req, res) => {
  try {
    console.log('Training models...');
    
    await mlEngine.trainModels();
    
    res.json({ 
      success: true, 
      message: 'Models trained successfully' 
    });
  } catch (error) {
    console.error('Training error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error training models',
      error: error.message
    });
  }
});

// Predict demand
app.post('/predict/demand', (req, res) => {
  try {
    const { features } = req.body;
    
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Features array is required' 
      });
    }
    
    const prediction = mlEngine.predictDemand(features);
    
    res.json({ 
      success: true, 
      prediction: prediction 
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error making prediction',
      error: error.message
    });
  }
});

// Predict optimal price
app.post('/predict/price', (req, res) => {
  try {
    const { features } = req.body;
    
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Features array is required' 
      });
    }
    
    const prediction = mlEngine.predictOptimalPrice(features);
    
    res.json({ 
      success: true, 
      prediction: prediction 
    });
  } catch (error) {
    console.error('Price prediction error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error making price prediction',
      error: error.message
    });
  }
});

// Predict delivery time
app.post('/predict/delivery', (req, res) => {
  try {
    const { features } = req.body;
    
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Features array is required' 
      });
    }
    
    const prediction = mlEngine.predictDeliveryTime(features);
    
    res.json({ 
      success: true, 
      prediction: prediction 
    });
  } catch (error) {
    console.error('Delivery prediction error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error predicting delivery time',
      error: error.message
    });
  }
});

// Generate recommendations
app.post('/recommendations', (req, res) => {
  try {
    const { userId, products } = req.body;
    
    if (!userId || !products) {
      return res.status(400).json({ 
        success: false, 
        message: 'userId and products are required' 
      });
    }
    
    const recommendations = mlEngine.generateRecommendations(userId, products);
    
    res.json({ 
      success: true, 
      recommendations: recommendations 
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating recommendations',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`ML Engine server running on port ${PORT}`);
});

module.exports = app;