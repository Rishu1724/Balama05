const { db } = require('../config/firebase');

// Message model
class Message {
  constructor(data) {
    this.participants = data.participants || [];
    this.lastMessage = data.lastMessage || '';
    this.lastMessageTime = data.lastMessageTime || new Date();
    this.unreadCount = data.unreadCount || {};
    this.messages = data.messages || [];
  }

  // Create a new conversation
  static async createConversation(data) {
    const message = new Message(data);
    const docRef = await db.collection('messages').add(message);
    return { id: docRef.id, ...message };
  }

  // Get a conversation by ID
  static async getConversationById(id) {
    const doc = await db.collection('messages').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Get conversations for a user
  static async getConversationsForUser(userId) {
    const snapshot = await db.collection('messages')
      .where('participants', 'array-contains', userId)
      .get();
    
    const conversations = [];
    snapshot.forEach(doc => {
      conversations.push({ id: doc.id, ...doc.data() });
    });
    return conversations;
  }

  // Add a message to a conversation
  static async addMessage(conversationId, messageData) {
    const conversation = await db.collection('messages').doc(conversationId).get();
    if (!conversation.exists) {
      return null;
    }
    
    const message = {
      ...messageData,
      timestamp: new Date()
    };
    
    await db.collection('messages').doc(conversationId).update({
      messages: [...conversation.data().messages, message],
      lastMessage: message.text,
      lastMessageTime: message.timestamp
    });
    
    const updatedConversation = await db.collection('messages').doc(conversationId).get();
    return { id: updatedConversation.id, ...updatedConversation.data() };
  }

  // Update unread count for a user in a conversation
  static async updateUnreadCount(conversationId, userId, count) {
    const conversation = await db.collection('messages').doc(conversationId).get();
    if (!conversation.exists) {
      return null;
    }
    
    const unreadCount = {
      ...conversation.data().unreadCount,
      [userId]: count
    };
    
    await db.collection('messages').doc(conversationId).update({
      unreadCount
    });
    
    const updatedConversation = await db.collection('messages').doc(conversationId).get();
    return { id: updatedConversation.id, ...updatedConversation.data() };
  }
}

module.exports = Message;