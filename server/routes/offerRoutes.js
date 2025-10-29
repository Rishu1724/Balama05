const express = require('express');
const { 
  createOffer,
  getOfferById,
  getOffersForProduct,
  getOffersForBuyer,
  updateOffer,
  deleteOffer
} = require('../controllers/offerController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new offer
router.post('/', authenticate, createOffer);

// Get an offer by ID
router.get('/:id', getOfferById);

// Get offers for a product
router.get('/product/:productId', getOffersForProduct);

// Get offers for a buyer
router.get('/buyer/:buyerId', getOffersForBuyer);

// Update an offer
router.put('/:id', authenticate, updateOffer);

// Delete an offer
router.delete('/:id', authenticate, deleteOffer);

module.exports = router;