const express = require('express');
const { 
  createNotification,
  getNotificationsByUserId,
  markNotificationAsRead,
  deleteNotification
} = require('../controllers/notificationController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new notification
router.post('/', authenticate, createNotification);

// Get notifications for a user
router.get('/:userId', getNotificationsByUserId);

// Mark notification as read
router.put('/:id/read', authenticate, markNotificationAsRead);

// Delete a notification
router.delete('/:id', authenticate, deleteNotification);

module.exports = router;