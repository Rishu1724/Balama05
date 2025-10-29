import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'seller') {
      navigate('/signup?role=seller');
    } else {
      navigate('/signup?role=buyer');
    }
  };

  return (
    <div className="role-selection">
      <div className="container">
        <div className="role-selection-content">
          <h1 className="title">Welcome to Balama Marketplace</h1>
          <p className="subtitle">Choose how you'd like to participate in our marketplace</p>
          
          <div className="role-cards">
            <div className="role-card buyer-card">
              <div className="role-icon">🛒</div>
              <h2>Buy Products</h2>
              <p>Browse and purchase from thousands of unique products from sellers worldwide.</p>
              <ul className="role-features">
                <li>✓ Browse thousands of products</li>
                <li>✓ Secure payment processing</li>
                <li>✓ Personalized recommendations</li>
                <li>✓ Easy order tracking</li>
              </ul>
              <button 
                className="btn btn-primary"
                onClick={() => handleRoleSelect('buyer')}
              >
                Start Buying
              </button>
            </div>
            
            <div className="role-card seller-card">
              <div className="role-icon">🏪</div>
              <h2>Sell Products</h2>
              <p>Set up your store and start selling your products to a global audience.</p>
              <ul className="role-features">
                <li>✓ Easy store setup</li>
                <li>✓ Advanced analytics</li>
                <li>✓ AI-powered pricing</li>
                <li>✓ Global reach</li>
              </ul>
              <button 
                className="btn btn-primary"
                onClick={() => handleRoleSelect('seller')}
              >
                Start Selling
              </button>
            </div>
          </div>
          
          <div className="login-option">
            <p>Already have an account? <button 
              className="login-link" 
              onClick={() => navigate('/login')}
            >
              Sign in here
            </button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;