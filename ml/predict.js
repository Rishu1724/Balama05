const axios = require('axios');

async function makePredictions() {
  try {
    const baseURL = 'http://localhost:4000';
    
    // Example demand prediction
    console.log('Making demand prediction...');
    const demandResponse = await axios.post(`${baseURL}/predict/demand`, {
      features: [100, 50, 4.5] // price, quantity, rating
    });
    
    console.log('Demand prediction:', demandResponse.data);
    
    // Example price prediction
    console.log('Making price prediction...');
    const priceResponse = await axios.post(`${baseURL}/predict/price`, {
      features: [100, 50, 4.5] // price, quantity, rating
    });
    
    console.log('Price prediction:', priceResponse.data);
    
    // Example recommendations
    console.log('Generating recommendations...');
    const recommendationsResponse = await axios.post(`${baseURL}/recommendations`, {
      userId: 'user123',
      products: [
        { id: 1, name: 'Product A', price: 100, rating: 4.5 },
        { id: 2, name: 'Product B', price: 150, rating: 4.2 },
        { id: 3, name: 'Product C', price: 80, rating: 4.8 }
      ]
    });
    
    console.log('Recommendations:', recommendationsResponse.data);
    
    // Example delivery prediction
    console.log('Predicting delivery time...');
    const deliveryResponse = await axios.post(`${baseURL}/predict/delivery`, {
      orderData: {
        distance: 150,
        traffic: 1.2
      }
    });
    
    console.log('Delivery prediction:', deliveryResponse.data);
    
  } catch (error) {
    console.error('Prediction error:', error.message);
  }
}

makePredictions();