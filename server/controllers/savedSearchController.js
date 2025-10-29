const SavedSearch = require('../models/SavedSearch');

// Create a new saved search
const createSavedSearch = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedSearch = await SavedSearch.create(userId, req.body);
    res.status(201).json({
      success: true,
      message: 'Saved search created successfully',
      savedSearch
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all saved searches for a user
const getSavedSearches = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedSearches = await SavedSearch.getAll(userId);
    res.status(200).json({
      success: true,
      savedSearches
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a saved search by ID
const getSavedSearchById = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const savedSearch = await SavedSearch.getById(userId, id);
    
    if (!savedSearch) {
      return res.status(404).json({
        success: false,
        message: 'Saved search not found'
      });
    }
    
    res.status(200).json({
      success: true,
      savedSearch
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a saved search
const updateSavedSearch = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const savedSearch = await SavedSearch.update(userId, id, req.body);
    
    if (!savedSearch) {
      return res.status(404).json({
        success: false,
        message: 'Saved search not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Saved search updated successfully',
      savedSearch
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a saved search
const deleteSavedSearch = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const deleted = await SavedSearch.delete(userId, id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Saved search not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Saved search deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSavedSearch,
  getSavedSearches,
  getSavedSearchById,
  updateSavedSearch,
  deleteSavedSearch
};