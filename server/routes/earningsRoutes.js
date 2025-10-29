const express = require('express');
const { 
  createOrUpdateEarnings,
  getEarnings,
  updateEarnings,
  addTransaction,
  requestPayout
} = require('../controllers/earningsController');
const { authenticate } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Create or update earnings for a seller
router.post('/', authenticate, createOrUpdateEarnings);

// Get earnings by seller ID
router.get('/', authenticate, getEarnings);

// Update earnings
router.put('/', authenticate, updateEarnings);

// Add a transaction to history
router.post('/transactions', authenticate, addTransaction);

// Request a payout
router.post('/payout', authenticate, requestPayout);

module.exports = router;