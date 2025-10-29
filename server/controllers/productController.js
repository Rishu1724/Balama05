const Product = require('../models/Product');
const multer = require('multer');
const { storage } = require('../config/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Create a new product
const createProduct = async (req, res) => {
  try {
    // Handle file uploads
    const imageUrls = [];
    
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const fileName = `${Date.now()}_${file.originalname}`;
        const imageRef = ref(storage, `products/${fileName}`);
        
        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(imageRef, file.buffer);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }
    }
    
    // Prepare product data
    const productData = {
      ...req.body,
      images: imageUrls,
      price: parseFloat(req.body.price),
      originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const product = await Product.create(productData);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle file uploads if new images are provided
    const updateData = { ...req.body };
    
    if (req.files && req.files.length > 0) {
      const imageUrls = [];
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const fileName = `${Date.now()}_${file.originalname}`;
        const imageRef = ref(storage, `products/${fileName}`);
        
        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(imageRef, file.buffer);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }
      
      updateData.images = imageUrls;
    }
    
    // Convert price fields to numbers
    if (updateData.price) {
      updateData.price = parseFloat(updateData.price);
    }
    if (updateData.originalPrice) {
      updateData.originalPrice = parseFloat(updateData.originalPrice);
    }
    
    const product = await Product.update(id, updateData);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  upload
};