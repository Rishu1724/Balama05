import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/role-selection');
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Balama Marketplace</h1>
        <p>Your one-stop destination for buying and selling</p>
        <button onClick={handleGetStarted} className="cta-button">
          Get Started
        </button>
      </header>
      
      <section className="features">
        <div className="feature">
          <h3>Easy Buying</h3>
          <p>Find exactly what you're looking for with our advanced search</p>
        </div>
        <div className="feature">
          <h3>Simple Selling</h3>
          <p>Reach millions of buyers with our powerful selling tools</p>
        </div>
        <div className="feature">
          <h3>Secure Transactions</h3>
          <p>Shop and sell with confidence using our secure payment system</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;