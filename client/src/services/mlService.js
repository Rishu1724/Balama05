class MLService {
  constructor() {
    this.baseUrl = 'http://localhost:4000'; // ML Engine server
  }

  // Predict demand for a product
  async predictDemand(features) {
    try {
      const response = await fetch(`${this.baseUrl}/predict/demand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error predicting demand:', error);
      throw error;
    }
  }

  // Predict optimal price for a product
  async predictOptimalPrice(features) {
    try {
      const response = await fetch(`${this.baseUrl}/predict/price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error predicting optimal price:', error);
      throw error;
    }
  }

  // Predict delivery time
  async predictDeliveryTime(features) {
    try {
      const response = await fetch(`${this.baseUrl}/predict/delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error predicting delivery time:', error);
      throw error;
    }
  }

  // Get product recommendations
  async getRecommendations(userId, products) {
    try {
      const response = await fetch(`${this.baseUrl}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, products }),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }

  // Train models (admin only)
  async trainModels() {
    try {
      const response = await fetch(`${this.baseUrl}/train`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error training models:', error);
      throw error;
    }
  }
}

export default new MLService();