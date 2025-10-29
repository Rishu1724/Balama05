const Dispute = require('../models/Dispute');

// Create a new dispute
const createDispute = async (req, res) => {
  try {
    const dispute = await Dispute.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Dispute created successfully',
      dispute
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a dispute by ID
const getDisputeById = async (req, res) => {
  try {
    const { id } = req.params;
    const dispute = await Dispute.getById(id);
    
    if (!dispute) {
      return res.status(404).json({
        success: false,
        message: 'Dispute not found'
      });
    }
    
    res.status(200).json({
      success: true,
      dispute
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get disputes for an order
const getDisputesForOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const disputes = await Dispute.getDisputesForOrder(orderId);
    res.status(200).json({
      success: true,
      disputes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get disputes for a user
const getDisputesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const disputes = await Dispute.getDisputesForUser(userId);
    res.status(200).json({
      success: true,
      disputes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a dispute
const updateDispute = async (req, res) => {
  try {
    const { id } = req.params;
    const dispute = await Dispute.update(id, req.body);
    
    if (!dispute) {
      return res.status(404).json({
        success: false,
        message: 'Dispute not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Dispute updated successfully',
      dispute
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a dispute
const deleteDispute = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Dispute.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Dispute not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Dispute deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createDispute,
  getDisputeById,
  getDisputesForOrder,
  getDisputesForUser,
  updateDispute,
  deleteDispute
};