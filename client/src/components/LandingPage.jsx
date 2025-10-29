import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <h1 className="logo">Balama Marketplace</h1>
          <nav>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Your Gateway to Global Commerce</h1>
            <p className="hero-subtitle">
              Connect buyers and sellers in a seamless marketplace experience. 
              Discover unique products or start selling your own creations.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">Get Started</Link>
              <Link to="/buyer/products" className="btn btn-secondary btn-large">Browse Products</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Balama?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏪</div>
              <h3>Easy Selling</h3>
              <p>Set up your store in minutes and start selling to a global audience.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Find exactly what you're looking for with our advanced search filters.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Payments</h3>
              <p>Shop and sell with confidence using our secure payment system.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>Get personalized recommendations and smart pricing suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Active Sellers</p>
            </div>
            <div className="stat-item">
              <h3>100K+</h3>
              <p>Products Listed</p>
            </div>
            <div className="stat-item">
              <h3>500K+</h3>
              <p>Happy Buyers</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of sellers and buyers in our thriving marketplace community.</p>
          <Link to="/signup" className="btn btn-primary btn-large">Create Free Account</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2025 Balama Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;