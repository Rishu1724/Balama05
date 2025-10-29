const MLEngine = require('./mlEngine');

async function trainModels() {
  console.log('Starting ML model training...');
  
  const mlEngine = new MLEngine();
  
  try {
    // Initialize database connection
    await mlEngine.initDB();
    
    // Load datasets
    console.log('Loading datasets...');
    const datasets = await mlEngine.loadAllDatasets();
    
    // Train models
    console.log('Training demand forecast model...');
    await mlEngine.trainDemandForecast(datasets.ecommerce);
    
    console.log('Training price optimization model...');
    await mlEngine.trainPriceOptimization(datasets.sales);
    
    console.log('Training delivery prediction model...');
    await mlEngine.trainDeliveryPrediction(datasets.logistics);
    
    // Save models
    await mlEngine.saveModels();
    
    console.log('All models trained successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Training failed:', error);
    process.exit(1);
  }
}

trainModels();