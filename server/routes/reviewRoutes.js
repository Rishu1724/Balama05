const express = require('express');
const { 
  createReview,
  getReviewsForUser,
  getReviewsForProduct,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new review
router.post('/', authenticate, createReview);

// Get reviews for a user
router.get('/user/:userId', getReviewsForUser);

// Get reviews for a product
router.get('/product/:productId', getReviewsForProduct);

// Update a review
router.put('/:id', authenticate, updateReview);

// Delete a review
router.delete('/:id', authenticate, deleteReview);

module.exports = router;