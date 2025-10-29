const Analytics = require('../models/Analytics');

// Get seller performance metrics
const getSellerPerformance = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const performance = await Analytics.getSellerPerformance(sellerId);
    
    res.status(200).json({
      success: true,
      performance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get product analytics
const getProductAnalytics = async (req, res) => {
  try {
    const { productId } = req.params;
    const analytics = await Analytics.getProductAnalytics(productId);
    
    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      analytics
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get buyer analytics
const getBuyerAnalytics = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const analytics = await Analytics.getBuyerAnalytics(buyerId);
    
    res.status(200).json({
      success: true,
      analytics
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getSellerPerformance,
  getProductAnalytics,
  getBuyerAnalytics
};