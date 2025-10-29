const express = require('express');
const { 
  searchProducts,
  incrementProductViews
} = require('../controllers/searchController');

const router = express.Router();

// Search products
router.get('/products', searchProducts);

// Increment product views
router.post('/products/:id/views', incrementProductViews);

module.exports = router;