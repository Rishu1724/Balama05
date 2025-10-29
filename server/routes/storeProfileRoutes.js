const express = require('express');
const { 
  createOrUpdateStoreProfile,
  getStoreProfile,
  updateStoreProfile,
  deleteStoreProfile
} = require('../controllers/storeProfileController');
const { authenticate } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Create or update a store profile
router.post('/', authenticate, createOrUpdateStoreProfile);

// Get a store profile by seller ID
router.get('/', getStoreProfile);

// Update a store profile
router.put('/', authenticate, updateStoreProfile);

// Delete a store profile
router.delete('/', authenticate, deleteStoreProfile);

module.exports = router;