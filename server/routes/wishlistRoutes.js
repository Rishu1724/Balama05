const express = require('express');
const { 
  createWishlist,
  getWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist
} = require('../controllers/wishlistController');
const { authenticate } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Create a new wishlist
router.post('/', authenticate, createWishlist);

// Get all wishlists for a user
router.get('/', authenticate, getWishlists);

// Get a wishlist by ID
router.get('/:id', authenticate, getWishlistById);

// Update a wishlist
router.put('/:id', authenticate, updateWishlist);

// Delete a wishlist
router.delete('/:id', authenticate, deleteWishlist);

module.exports = router;