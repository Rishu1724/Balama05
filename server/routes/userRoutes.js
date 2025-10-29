const express = require('express');
const { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user
router.put('/:id', authenticate, updateUser);

// Delete a user
router.delete('/:id', authenticate, deleteUser);

module.exports = router;