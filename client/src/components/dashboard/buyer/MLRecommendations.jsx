import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mlService from '../../../services/mlService';

const MLRecommendations = ({ products, userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (products && products.length > 0 && userId) {
      generateRecommendations();
    }
  }, [products, userId]);

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await mlService.getRecommendations(userId, products);
      if (result.success && result.recommendations) {
        setRecommendations(result.recommendations);
      }
    } catch (err) {
      console.error('Error generating recommendations:', err);
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="ml-recommendations">Finding personalized recommendations...</div>;
  }

  return (
    <div className="ml-recommendations">
      <div className="recommendations-header">
        <h2>Personalized Recommendations</h2>
        <button 
          className="btn btn-secondary" 
          onClick={generateRecommendations}
          disabled={loading}
        >
          Refresh Recommendations
        </button>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {recommendations && recommendations.length > 0 ? (
        <div className="recommendations-grid">
          {recommendations.map((product, index) => (
            <div key={index} className="recommendation-card">
              <div className="product-image">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={`http://localhost:3001${product.images[0]}`} 
                    alt={product.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                    }}
                  />
                ) : (
                  <div className="placeholder-image">
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                </div>
                <div className="product-meta">
                  <span className="rating">⭐ {product.rating || 'N/A'}</span>
                </div>
                <Link to={`/buyer/products/${product.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-recommendations">
          <p>No personalized recommendations available at the moment.</p>
          <p>Continue browsing products to improve recommendations.</p>
        </div>
      )}
    </div>
  );
};

export default MLRecommendations;