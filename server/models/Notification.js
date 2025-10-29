const mongoose = require('mongoose');

// Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    enum: ['info', 'success', 'warning', 'error']
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Static methods for Notification model
notificationSchema.statics.createNotification = async function(data) {
  const notification = new this(data);
  return await notification.save();
};

notificationSchema.statics.getByUserId = async function(userId) {
  return await this.find({ userId: userId }).sort({ createdAt: -1 });
};

notificationSchema.statics.markAsRead = async function(id) {
  return await this.findByIdAndUpdate(id, { read: true }, { new: true });
};

notificationSchema.statics.deleteNotification = async function(id) {
  const result = await this.findByIdAndDelete(id);
  return result !== null;
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;