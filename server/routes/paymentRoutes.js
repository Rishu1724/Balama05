const express = require('express');
const { 
  processPayment, 
  getPaymentHistory, 
  processRefund 
} = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Process a payment
router.post('/', authenticate, processPayment);

// Get payment history
router.get('/history', authenticate, getPaymentHistory);

// Process a refund
router.post('/refund', authenticate, processRefund);

module.exports = router;