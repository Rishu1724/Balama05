const Earnings = require('../models/Earnings');

// Create or update earnings for a seller
const createOrUpdateEarnings = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const earnings = await Earnings.createOrUpdate(sellerId, req.body);
    res.status(201).json({
      success: true,
      message: 'Earnings created/updated successfully',
      earnings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get earnings by seller ID
const getEarnings = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const earnings = await Earnings.getBySellerId(sellerId);
    
    if (!earnings) {
      return res.status(404).json({
        success: false,
        message: 'Earnings not found'
      });
    }
    
    res.status(200).json({
      success: true,
      earnings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update earnings
const updateEarnings = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const earnings = await Earnings.update(sellerId, req.body);
    
    if (!earnings) {
      return res.status(404).json({
        success: false,
        message: 'Earnings not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Earnings updated successfully',
      earnings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Add a transaction to history
const addTransaction = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const transaction = req.body;
    const earnings = await Earnings.addTransaction(sellerId, transaction);
    
    if (!earnings) {
      return res.status(404).json({
        success: false,
        message: 'Earnings not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Transaction added successfully',
      earnings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Request a payout
const requestPayout = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { amount } = req.body;
    const earnings = await Earnings.requestPayout(sellerId, amount);
    
    if (!earnings) {
      return res.status(404).json({
        success: false,
        message: 'Earnings not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Payout requested successfully',
      earnings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createOrUpdateEarnings,
  getEarnings,
  updateEarnings,
  addTransaction,
  requestPayout
};