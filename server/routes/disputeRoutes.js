const express = require('express');
const { 
  createDispute,
  getDisputeById,
  getDisputesForOrder,
  getDisputesForUser,
  updateDispute,
  deleteDispute
} = require('../controllers/disputeController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new dispute
router.post('/', authenticate, createDispute);

// Get a dispute by ID
router.get('/:id', getDisputeById);

// Get disputes for an order
router.get('/order/:orderId', getDisputesForOrder);

// Get disputes for a user
router.get('/user/:userId', getDisputesForUser);

// Update a dispute
router.put('/:id', authenticate, updateDispute);

// Delete a dispute
router.delete('/:id', authenticate, deleteDispute);

module.exports = router;