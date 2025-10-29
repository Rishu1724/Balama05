const Notification = require('../models/Notification');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const notification = await Notification.createNotification(req.body);
    
    // Transform the notification object to match the expected response format
    const notificationResponse = {
      id: notification._id,
      ...notification.toObject()
    };
    
    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      notification: notificationResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get notifications for a user
const getNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.getByUserId(userId);
    
    // Transform the notifications array to match the expected response format
    const notificationsResponse = notifications.map(notification => ({
      id: notification._id,
      ...notification.toObject()
    }));
    
    res.status(200).json({
      success: true,
      notifications: notificationsResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Mark notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.markAsRead(id);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }
    
    // Transform the notification object to match the expected response format
    const notificationResponse = {
      id: notification._id,
      ...notification.toObject()
    };
    
    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      notification: notificationResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.deleteNotification(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createNotification,
  getNotificationsByUserId,
  markNotificationAsRead,
  deleteNotification
};