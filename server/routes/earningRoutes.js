const express = require('express');
const router = express.Router();

// Mock controller functions
const getEarnings = async (req, res) => {
  try {
    // Mock data
    const earnings = {
      total: 12500.75,
      thisMonth: 3250.50,
      thisWeek: 850.25,
      today: 120.00
    };
    
    res.status(200).json({
      success: true,
      message: 'Earnings fetched successfully',
      earnings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching earnings',
      error: error.message
    });
  }
};

const getEarningsHistory = async (req, res) => {
  try {
    // Mock data
    const history = [
      { date: '2023-05-01', amount: 1200.00, description: 'Product sales' },
      { date: '2023-05-05', amount: 850.50, description: 'Product sales' },
      { date: '2023-05-10', amount: 2100.25, description: 'Product sales' },
      { date: '2023-05-15', amount: 1750.00, description: 'Product sales' },
      { date: '2023-05-20', amount: 3200.00, description: 'Product sales' }
    ];
    
    res.status(200).json({
      success: true,
      message: 'Earnings history fetched successfully',
      history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching earnings history',
      error: error.message
    });
  }
};

// Routes
router.get('/', getEarnings);
router.get('/history', getEarningsHistory);

module.exports = router;