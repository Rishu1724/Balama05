const express = require('express');
const { 
  createSavedSearch,
  getSavedSearches,
  getSavedSearchById,
  updateSavedSearch,
  deleteSavedSearch
} = require('../controllers/savedSearchController');
const { authenticate } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Create a new saved search
router.post('/', authenticate, createSavedSearch);

// Get all saved searches for a user
router.get('/', authenticate, getSavedSearches);

// Get a saved search by ID
router.get('/:id', authenticate, getSavedSearchById);

// Update a saved search
router.put('/:id', authenticate, updateSavedSearch);

// Delete a saved search
router.delete('/:id', authenticate, deleteSavedSearch);

module.exports = router;