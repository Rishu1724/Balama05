const express = require('express');
const { signUp, login, logout } = require('../controllers/authController');

const router = express.Router();

// Sign up route
router.post('/signup', signUp);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

module.exports = router;