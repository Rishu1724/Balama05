const mongoose = require('mongoose');

// Product Schema with image storage support
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'used', 'refurbished']
  },
  specifications: {
    type: Map,
    of: String
  },
  sellerId: {
    type: String,
    required: true
  },
  location: {
    type: Map,
    of: String
  },
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'sold']
  },
  featured: {
    type: Boolean,
    default: false
  },
  isFeaturedUntil: {
    type: Date
  },
  tags: [{
    type: String
  }],
  video: {
    type: String
  },
  // Updated to support image storage as buffers
  images: [{
    data: Buffer,
    contentType: String,
    originalName: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;