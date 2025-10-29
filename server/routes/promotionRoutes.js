const express = require('express');
const { 
  createPromotion,
  getPromotionById,
  getActivePromotions,
  getPromotionsByProduct,
  updatePromotion,
  deletePromotion,
  incrementPromotionViews,
  incrementPromotionClicks
} = require('../controllers/promotionController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new promotion
router.post('/', authenticate, createPromotion);

// Get a promotion by ID
router.get('/:id', getPromotionById);

// Get all active promotions
router.get('/', getActivePromotions);

// Get promotions by product ID
router.get('/product/:productId', getPromotionsByProduct);

// Update a promotion
router.put('/:id', authenticate, updatePromotion);

// Delete a promotion
router.delete('/:id', authenticate, deletePromotion);

// Increment views
router.post('/:id/views', incrementPromotionViews);

// Increment clicks
router.post('/:id/clicks', incrementPromotionClicks);

module.exports = router;