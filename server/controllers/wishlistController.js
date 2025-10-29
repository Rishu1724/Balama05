const Wishlist = require('../models/Wishlist');

// Create a new wishlist
const createWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.create(userId, req.body);
    res.status(201).json({
      success: true,
      message: 'Wishlist created successfully',
      wishlist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all wishlists for a user
const getWishlists = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlists = await Wishlist.getAll(userId);
    res.status(200).json({
      success: true,
      wishlists
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a wishlist by ID
const getWishlistById = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const wishlist = await Wishlist.getById(userId, id);
    
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }
    
    res.status(200).json({
      success: true,
      wishlist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a wishlist
const updateWishlist = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const wishlist = await Wishlist.update(userId, id, req.body);
    
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Wishlist updated successfully',
      wishlist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a wishlist
const deleteWishlist = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const deleted = await Wishlist.delete(userId, id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Wishlist deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createWishlist,
  getWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist
};