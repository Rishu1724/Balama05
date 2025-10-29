const express = require('express');
const { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct,
  upload
} = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new product with image upload
router.post('/', authenticate, upload.array('images', 5), createProduct);

// Get all products
router.get('/', getProducts);

// Get a product by ID
router.get('/:id', getProductById);

// Update a product with optional image upload
router.put('/:id', authenticate, upload.array('images', 5), updateProduct);

// Delete a product
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;