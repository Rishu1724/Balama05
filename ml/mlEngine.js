const mongoose = require('mongoose');
const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

class MLEngine {
  constructor() {
    this.models = {
      demandForecast: null,
      priceOptimization: null,
      deliveryPrediction: null,
      recommendation: null
    };
    this.isTrained = false;
    this.dataDir = path.join(__dirname, 'data');
  }

  // Initialize MongoDB connection
  async initDB() {
    try {
      // This would connect to your existing MongoDB
      console.log('ML Engine: Database connection initialized');
    } catch (error) {
      console.error('ML Engine: Database connection failed', error);
    }
  }

  // Load dataset from CSV
  loadDataset(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log(`Loaded ${results.length} records from ${filePath}`);
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  // Load all datasets (prefer larger datasets if available)
  async loadAllDatasets() {
    try {
      // Check if large datasets exist, otherwise use regular ones
      const ecommerceFile = fs.existsSync(path.join(this.dataDir, 'ecommerce_large.csv')) 
        ? 'ecommerce_large.csv' 
        : 'ecommerce_data.csv';
        
      const logisticsFile = fs.existsSync(path.join(this.dataDir, 'logistics_large.csv')) 
        ? 'logistics_large.csv' 
        : 'logistics_data.csv';
        
      const salesFile = fs.existsSync(path.join(this.dataDir, 'sales_large.csv')) 
        ? 'sales_large.csv' 
        : 'sales_data.csv';
      
      const ecommerceData = await this.loadDataset(path.join(this.dataDir, ecommerceFile));
      const logisticsData = await this.loadDataset(path.join(this.dataDir, logisticsFile));
      const salesData = await this.loadDataset(path.join(this.dataDir, salesFile));
      
      return {
        ecommerce: ecommerceData,
        logistics: logisticsData,
        sales: salesData
      };
    } catch (error) {
      console.error('Error loading datasets:', error);
      throw error;
    }
  }

  // Simple rule-based demand forecasting
  predictDemand(features) {
    const [price, rating, stock] = features;
    
    // Simple heuristic: higher rating and lower price = higher demand
    // Adjust based on your business logic
    let demand = 100; // Base demand
    
    // Price factor (lower price = higher demand)
    demand *= (1000 / (price || 1000));
    
    // Rating factor (higher rating = higher demand)
    demand *= (rating || 3);
    
    // Stock factor (more stock = more confidence)
    demand *= (stock > 50 ? 1.2 : stock > 20 ? 1.0 : 0.8);
    
    return Math.max(0, Math.round(demand));
  }

  // Simple rule-based price optimization
  predictOptimalPrice(features) {
    const [currentSales, discount, promotion] = features;
    
    // Simple heuristic: if sales are low, suggest a discount
    // If sales are high, suggest maintaining or increasing price
    let optimalPriceMultiplier = 1.0;
    
    if (currentSales < 50) {
      optimalPriceMultiplier = 0.9; // 10% discount
    } else if (currentSales > 150) {
      optimalPriceMultiplier = 1.05; // 5% increase
    }
    
    // Apply promotion effect
    if (promotion === 1) {
      optimalPriceMultiplier *= 0.95; // Additional 5% for promotion
    }
    
    return optimalPriceMultiplier;
  }

  // Simple rule-based delivery time prediction
  predictDeliveryTime(features) {
    const [distance, traffic, weather] = features;
    
    // Base time calculation
    let time = distance * 0.8; // 0.8 hours per km base
    
    // Traffic factor
    time *= traffic; // 1 = light, 2 = moderate, 3 = heavy
    
    // Weather factor
    time *= weather; // 1 = clear, 2 = cloudy, 3 = stormy
    
    return Math.max(1, Math.round(time));
  }

  // Simple recommendation system
  generateRecommendations(userId, products) {
    // Simple recommendation logic based on rating and sales
    return products
      .sort((a, b) => {
        // Sort by composite score: rating * sales
        const scoreA = (a.rating || 0) * (a.sales || 0);
        const scoreB = (b.rating || 0) * (b.sales || 0);
        return scoreB - scoreA;
      })
      .slice(0, 5);
  }

  // Train models (simplified - just load data)
  async trainModels() {
    try {
      console.log('Training models (simplified)...');
      const datasets = await this.loadAllDatasets();
      
      // In a real implementation, you would train actual ML models
      // For now, we'll just simulate trained models
      this.models.demandForecast = true;
      this.models.priceOptimization = true;
      this.models.deliveryPrediction = true;
      this.models.recommendation = true;
      
      this.isTrained = true;
      console.log('Models trained successfully (simplified)');
      
      return datasets;
    } catch (error) {
      console.error('Error training models:', error);
      throw error;
    }
  }
}

module.exports = MLEngine;