import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, userType }) => {
  if (!products || products.length === 0) {
    return (
      <div className="card">
        <p>No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
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
              <div className="placeholder-image" style={{
                width: '100%',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                color: '#6c757d'
              }}>
                <span>No Image</span>
              </div>
            )}
          </div>
          <div className="product-info">
            <h3>{product.title}</h3>
            <p style={{ 
              color: '#6c757d', 
              fontSize: '0.9rem', 
              minHeight: '3rem',
              marginBottom: '1rem'
            }}>
              {product.description?.substring(0, 100)}...
            </p>
            <div className="product-price">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">${product.originalPrice}</span>
              )}
            </div>
            <div className="product-meta">
              <span className="rating">⭐ {product.rating || 'N/A'}</span>
              <span className="condition" style={{ 
                backgroundColor: product.condition === 'new' ? '#28a745' : product.condition === 'used' ? '#ffc107' : '#6c757d',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}>
                {product.condition}
              </span>
            </div>
            <div style={{ marginTop: '1rem' }}>
              {userType === 'seller' ? (
                <Link to={`/seller/products/${product.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                  Edit Product
                </Link>
              ) : (
                <Link to={`/buyer/products/${product.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                  View Details
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;