const express = require('express');
const { 
  getSellerPerformance,
  getProductAnalytics,
  getBuyerAnalytics
} = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get seller performance metrics
router.get('/seller/:sellerId', authenticate, getSellerPerformance);

// Get product analytics
router.get('/product/:productId', getProductAnalytics);

// Get buyer analytics
router.get('/buyer/:buyerId', authenticate, getBuyerAnalytics);

module.exports = router;