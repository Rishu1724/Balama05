const Message = require('../models/Message');

// Create a new conversation
const createConversation = async (req, res) => {
  try {
    const conversation = await Message.createConversation(req.body);
    res.status(201).json({
      success: true,
      message: 'Conversation created successfully',
      conversation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get conversations for a user
const getConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Message.getConversationsForUser(userId);
    res.status(200).json({
      success: true,
      conversations
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a conversation by ID
const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Message.getConversationById(id);
    
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      conversation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Add a message to a conversation
const addMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const message = await Message.addMessage(conversationId, req.body);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message added successfully',
      conversation: message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update unread count for a user in a conversation
const updateUnreadCount = async (req, res) => {
  try {
    const { conversationId, userId } = req.params;
    const { count } = req.body;
    const conversation = await Message.updateUnreadCount(conversationId, userId, count);
    
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Unread count updated successfully',
      conversation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversationById,
  addMessage,
  updateUnreadCount
};