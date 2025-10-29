const Promotion = require('../models/Promotion');

// Create a new promotion
const createPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Promotion created successfully',
      promotion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a promotion by ID
const getPromotionById = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.getById(id);
    
    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found'
      });
    }
    
    res.status(200).json({
      success: true,
      promotion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all active promotions
const getActivePromotions = async (req, res) => {
  try {
    const promotions = await Promotion.getActivePromotions();
    res.status(200).json({
      success: true,
      promotions
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get promotions by product ID
const getPromotionsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const promotions = await Promotion.getPromotionsByProduct(productId);
    res.status(200).json({
      success: true,
      promotions
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a promotion
const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.update(id, req.body);
    
    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Promotion updated successfully',
      promotion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a promotion
const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Promotion.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Promotion deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Increment views
const incrementPromotionViews = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.incrementViews(id);
    
    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Promotion views incremented',
      promotion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Increment clicks
const incrementPromotionClicks = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.incrementClicks(id);
    
    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Promotion clicks incremented',
      promotion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createPromotion,
  getPromotionById,
  getActivePromotions,
  getPromotionsByProduct,
  updatePromotion,
  deletePromotion,
  incrementPromotionViews,
  incrementPromotionClicks
};