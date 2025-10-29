const { db } = require('../config/firebase');

// Search products
const searchProducts = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, condition, sortBy, sortOrder } = req.query;
    
    let productsQuery = db.collection('products');
    
    // Apply filters
    if (query) {
      productsQuery = productsQuery.where('title', '>=', query)
        .where('title', '<=', query + '\uf8ff');
    }
    
    if (category) {
      productsQuery = productsQuery.where('category', '==', category);
    }
    
    if (minPrice) {
      productsQuery = productsQuery.where('price', '>=', parseFloat(minPrice));
    }
    
    if (maxPrice) {
      productsQuery = productsQuery.where('price', '<=', parseFloat(maxPrice));
    }
    
    if (condition) {
      productsQuery = productsQuery.where('condition', '==', condition);
    }
    
    // Apply sorting
    if (sortBy && sortOrder) {
      productsQuery = productsQuery.orderBy(sortBy, sortOrder);
    } else {
      productsQuery = productsQuery.orderBy('createdAt', 'desc');
    }
    
    const snapshot = await productsQuery.get();
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
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

// Increment product views
const incrementProductViews = async (req, res) => {
  try {
    const { id } = req.params;
    
    const productRef = db.collection('products').doc(id);
    const product = await productRef.get();
    
    if (!product.exists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    await productRef.update({
      views: product.data().views + 1
    });
    
    res.status(200).json({
      success: true,
      message: 'Product views incremented'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  searchProducts,
  incrementProductViews
};