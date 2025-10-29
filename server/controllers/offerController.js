const Offer = require('../models/Offer');

// Create a new offer
const createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      offer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get an offer by ID
const getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.getById(id);
    
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      offer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get offers for a product
const getOffersForProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const offers = await Offer.getOffersForProduct(productId);
    res.status(200).json({
      success: true,
      offers
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get offers for a buyer
const getOffersForBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const offers = await Offer.getOffersForBuyer(buyerId);
    res.status(200).json({
      success: true,
      offers
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update an offer
const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.update(id, req.body);
    
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Offer updated successfully',
      offer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete an offer
const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Offer.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Offer deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createOffer,
  getOfferById,
  getOffersForProduct,
  getOffersForBuyer,
  updateOffer,
  deleteOffer
};