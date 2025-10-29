const { connectToMongo, isConnectedToDB } = require('../config/mongodb');
const Product = require('../models/Product'); // Use Mongoose model
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Create a new product
const createProduct = async (req, res) => {
  try {
    // Handle file uploads - store images directly in MongoDB as binary data
    const imageBuffers = [];
    
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        // Store the image buffer directly in MongoDB
        imageBuffers.push({
          data: file.buffer,
          contentType: file.mimetype,
          originalName: file.originalname,
          size: file.size,
          uploadDate: new Date()
        });
      }
    }
    
    // Parse specifications if provided
    let specifications = {};
    if (req.body.specifications) {
      try {
        specifications = typeof req.body.specifications === 'string' 
          ? JSON.parse(req.body.specifications) 
          : req.body.specifications;
      } catch (e) {
        console.warn('Failed to parse specifications:', e);
        specifications = {};
      }
    }
    
    // Parse location if provided
    let location = {};
    if (req.body.location) {
      try {
        location = typeof req.body.location === 'string' 
          ? JSON.parse(req.body.location) 
          : req.body.location;
      } catch (e) {
        console.warn('Failed to parse location:', e);
        location = {};
      }
    }
    
    // Parse tags if provided
    let tags = [];
    if (req.body.tags) {
      tags = typeof req.body.tags === 'string' 
        ? req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : req.body.tags;
    }
    
    // Prepare product data (storing image buffers in MongoDB)
    const productData = {
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : null,
      category: req.body.category,
      subcategory: req.body.subcategory || '',
      condition: req.body.condition,
      specifications: specifications,
      sellerId: req.user ? req.user.userId : 'anonymous', // From auth middleware
      location: location,
      tags: tags,
      images: imageBuffers, // Store image buffers directly in MongoDB
      status: 'active'
    };
    
    // Try to connect to MongoDB
    await connectToMongo();
    
    // Check if MongoDB is connected
    if (isConnectedToDB && isConnectedToDB()) {
      // Use Mongoose model to create product
      const product = new Product(productData);
      await product.save();
      
      // Return product data with image URLs for client-side display
      const productResponse = {
        id: product._id,
        ...product.toObject(),
        images: imageBuffers.map((img, index) => `/api/products/${product._id}/image/${index}`)
      };
      
      res.status(201).json({
        success: true,
        message: 'Product created successfully with MongoDB',
        product: productResponse
      });
    } else {
      // If MongoDB is not connected, return an error
      res.status(500).json({
        success: false,
        message: 'Database connection error. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    // Try to connect to MongoDB
    await connectToMongo();
    
    // Check if MongoDB is connected
    if (isConnectedToDB && isConnectedToDB()) {
      // Use Mongoose model to fetch products
      const products = await Product.find({});
      
      // Transform products to include image URLs
      const productsResponse = products.map(product => {
        const productObj = product.toObject();
        return {
          ...productObj,
          id: productObj._id,
          images: productObj.images ? productObj.images.map((img, index) => `/api/products/${productObj._id}/image/${index}`) : []
        };
      });
      
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully from MongoDB',
        products: productsResponse
      });
    } else {
      // If MongoDB is not connected, return an error
      res.status(500).json({
        success: false,
        message: 'Database connection error. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to connect to MongoDB
    await connectToMongo();
    
    // Check if MongoDB is connected
    if (isConnectedToDB && isConnectedToDB()) {
      // Use Mongoose model to fetch product
      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found in MongoDB'
        });
      }
      
      // Transform product to include image URLs
      const productObj = product.toObject();
      const productResponse = {
        ...productObj,
        id: productObj._id,
        images: productObj.images ? productObj.images.map((img, index) => `/api/products/${productObj._id}/image/${index}`) : []
      };
      
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully from MongoDB',
        product: productResponse
      });
    } else {
      // If MongoDB is not connected, return an error
      res.status(500).json({
        success: false,
        message: 'Database connection error. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle file uploads - store images directly in MongoDB as binary data
    const imageBuffers = [];
    
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        // Store the image buffer directly in MongoDB
        imageBuffers.push({
          data: file.buffer,
          contentType: file.mimetype,
          originalName: file.originalname,
          size: file.size,
          uploadDate: new Date()
        });
      }
    }
    
    // Prepare update data
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };
    
    // Add new images if any
    if (imageBuffers.length > 0) {
      updateData.images = imageBuffers;
    }
    
    // Convert price fields to numbers if provided
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.originalPrice) updateData.originalPrice = parseFloat(updateData.originalPrice);
    
    // Try to connect to MongoDB
    await connectToMongo();
    
    // Check if MongoDB is connected
    if (isConnectedToDB && isConnectedToDB()) {
      // Use Mongoose model to update product
      const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found in MongoDB'
        });
      }
      
      // Transform product to include image URLs
      const productObj = product.toObject();
      const productResponse = {
        ...productObj,
        id: productObj._id,
        images: productObj.images ? productObj.images.map((img, index) => `/api/products/${productObj._id}/image/${index}`) : []
      };
      
      res.status(200).json({
        success: true,
        message: 'Product updated successfully in MongoDB',
        product: productResponse
      });
    } else {
      // If MongoDB is not connected, return an error
      res.status(500).json({
        success: false,
        message: 'Database connection error. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to connect to MongoDB
    await connectToMongo();
    
    // Check if MongoDB is connected
    if (isConnectedToDB && isConnectedToDB()) {
      // Use Mongoose model to delete product
      const product = await Product.findByIdAndDelete(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found in MongoDB'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully from MongoDB'
      });
    } else {
      // If MongoDB is not connected, return an error
      res.status(500).json({
        success: false,
        message: 'Database connection error. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// Add a new function to serve images from MongoDB
const getProductImage = async (req, res) => {
  try {
    const { productId, imageIndex } = req.params;
    
    // Try to connect to MongoDB
    await connectToMongo();
    
    // Check if MongoDB is connected
    if (isConnectedToDB && isConnectedToDB()) {
      // Use Mongoose model to fetch product
      const product = await Product.findById(productId);
      
      if (!product || !product.images || imageIndex >= product.images.length) {
        return res.status(404).json({
          success: false,
          message: 'Image not found'
        });
      }
      
      const image = product.images[imageIndex];
      
      // Set the appropriate content type
      res.set('Content-Type', image.contentType);
      
      // Send the image buffer
      res.send(image.data);
    } else {
      // If not connected to MongoDB, return an error
      res.status(500).json({
        success: false,
        message: 'Database connection error. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product image',
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  upload,
  getProductImage
};