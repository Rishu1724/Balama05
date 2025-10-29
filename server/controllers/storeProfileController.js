const StoreProfile = require('../models/StoreProfile');

// Create or update a store profile
const createOrUpdateStoreProfile = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const storeProfile = await StoreProfile.createOrUpdate(sellerId, req.body);
    res.status(201).json({
      success: true,
      message: 'Store profile created/updated successfully',
      storeProfile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a store profile by seller ID
const getStoreProfile = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const storeProfile = await StoreProfile.getBySellerId(sellerId);
    
    if (!storeProfile) {
      return res.status(404).json({
        success: false,
        message: 'Store profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      storeProfile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a store profile
const updateStoreProfile = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const storeProfile = await StoreProfile.update(sellerId, req.body);
    
    if (!storeProfile) {
      return res.status(404).json({
        success: false,
        message: 'Store profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Store profile updated successfully',
      storeProfile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a store profile
const deleteStoreProfile = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const deleted = await StoreProfile.delete(sellerId);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Store profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Store profile deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createOrUpdateStoreProfile,
  getStoreProfile,
  updateStoreProfile,
  deleteStoreProfile
};