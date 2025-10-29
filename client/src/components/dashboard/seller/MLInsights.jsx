import React, { useState, useEffect } from 'react';
import mlService from '../../../services/mlService';

const MLInsights = ({ products }) => {
  const [insights, setInsights] = useState({
    demandForecast: null,
    priceOptimization: null,
    bestSelling: null,
    stockAlerts: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      generateInsights();
    }
  }, [products]);

  const generateInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Generate demand forecasts for top products
      const topProducts = products.slice(0, 5);
      const demandForecasts = [];
      
      for (const product of topProducts) {
        try {
          // Features: [price, rating, stock_level]
          const features = [
            product.price || 0,
            product.rating || 0,
            product.stock || 0
          ];
          
          const demandResult = await mlService.predictDemand(features);
          demandForecasts.push({
            productId: product.id,
            productName: product.title,
            forecast: demandResult.prediction,
            currentPrice: product.price
          });
        } catch (err) {
          console.warn(`Could not generate forecast for ${product.title}:`, err);
        }
      }
      
      // Identify best selling products (simplified)
      const bestSelling = [...products]
        .sort((a, b) => (b.sales || 0) - (a.sales || 0))
        .slice(0, 5);
      
      // Identify stock alerts (low stock products)
      const lowStockProducts = products.filter(product => 
        product.stock < 10 // Less than 10 items in stock
      );
      
      setInsights({
        demandForecast: demandForecasts,
        bestSelling: bestSelling,
        stockAlerts: lowStockProducts,
        lastUpdated: new Date().toLocaleString()
      });
    } catch (err) {
      console.error('Error generating insights:', err);
      setError('Failed to generate insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrainModels = async () => {
    setLoading(true);
    try {
      await mlService.trainModels();
      alert('Models trained successfully!');
      generateInsights(); // Refresh insights
    } catch (err) {
      console.error('Error training models:', err);
      setError('Failed to train models. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="ml-insights">Generating insights...</div>;
  }

  return (
    <div className="ml-insights">
      <div className="insights-header">
        <h2>AI Insights & Recommendations</h2>
        <button 
          className="btn btn-secondary" 
          onClick={generateInsights}
          disabled={loading}
        >
          Refresh Insights
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleTrainModels}
          disabled={loading}
        >
          Retrain Models
        </button>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="insights-grid">
        {/* Demand Forecast */}
        <div className="insight-card">
          <h3>Demand Forecast</h3>
          {insights.demandForecast && insights.demandForecast.length > 0 ? (
            <ul>
              {insights.demandForecast.map((item, index) => (
                <li key={index}>
                  <strong>{item.productName}</strong>: 
                  Expected sales of {Math.round(item.forecast)} units
                  {item.forecast > 50 && (
                    <span className="high-demand"> 🔥 High Demand</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No demand forecast data available.</p>
          )}
        </div>
        
        {/* Best Selling Products */}
        <div className="insight-card">
          <h3>Best Selling Products</h3>
          {insights.bestSelling && insights.bestSelling.length > 0 ? (
            <ul>
              {insights.bestSelling.map((product, index) => (
                <li key={index}>
                  <strong>{product.title}</strong>: 
                  {product.sales || 0} units sold
                </li>
              ))}
            </ul>
          ) : (
            <p>No best selling data available.</p>
          )}
        </div>
        
        {/* Stock Alerts */}
        <div className="insight-card">
          <h3>Stock Alerts</h3>
          {insights.stockAlerts && insights.stockAlerts.length > 0 ? (
            <ul>
              {insights.stockAlerts.map((product, index) => (
                <li key={index} className="alert-item">
                  <strong>{product.title}</strong>: 
                  Only {product.stock || 0} items left in stock
                  <span className="low-stock"> ⚠️ Low Stock</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="success-message">All products have sufficient stock levels.</p>
          )}
        </div>
        
        {/* Price Optimization */}
        <div className="insight-card">
          <h3>Price Optimization</h3>
          <p>AI suggests optimal pricing based on demand, competition, and seasonality.</p>
          <button className="btn btn-primary">
            Run Price Analysis
          </button>
        </div>
      </div>
      
      <div className="insights-footer">
        <p>Last updated: {insights.lastUpdated || 'Never'}</p>
      </div>
    </div>
  );
};

export default MLInsights;