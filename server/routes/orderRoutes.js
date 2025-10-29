const express = require('express');
const { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrder, 
  deleteOrder 
} = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new order
router.post('/', authenticate, createOrder);

// Get all orders
router.get('/', getOrders);

// Get an order by ID
router.get('/:id', getOrderById);

// Update an order
router.put('/:id', authenticate, updateOrder);

// Delete an order
router.delete('/:id', authenticate, deleteOrder);

module.exports = router;