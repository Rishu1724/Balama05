const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    
    // Transform the order object to match the expected response format
    const orderResponse = {
      id: order._id,
      ...order.toObject()
    };
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: orderResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    
    // Transform the orders array to match the expected response format
    const ordersResponse = orders.map(order => ({
      id: order._id,
      ...order.toObject()
    }));
    
    res.status(200).json({
      success: true,
      orders: ordersResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.getById(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Transform the order object to match the expected response format
    const orderResponse = {
      id: order._id,
      ...order.toObject()
    };
    
    res.status(200).json({
      success: true,
      order: orderResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.update(id, req.body);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Transform the order object to match the expected response format
    const orderResponse = {
      id: order._id,
      ...order.toObject()
    };
    
    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order: orderResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};