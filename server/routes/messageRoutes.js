const express = require('express');
const { 
  createConversation,
  getConversations,
  getConversationById,
  addMessage,
  updateUnreadCount
} = require('../controllers/messageController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new conversation
router.post('/conversations', authenticate, createConversation);

// Get conversations for a user
router.get('/conversations/:userId', authenticate, getConversations);

// Get a conversation by ID
router.get('/conversations/:id', authenticate, getConversationById);

// Add a message to a conversation
router.post('/conversations/:conversationId/messages', authenticate, addMessage);

// Update unread count for a user in a conversation
router.put('/conversations/:conversationId/unread/:userId', authenticate, updateUnreadCount);

module.exports = router;