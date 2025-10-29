const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: 'buyer',
    enum: ['buyer', 'seller']
  },
  profilePicture: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    type: Map,
    of: String,
    default: {}
  },
  verified: {
    type: Boolean,
    default: false
  },
  ratings: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Static methods for User model
userSchema.statics.create = async function(data) {
  const user = new this(data);
  return await user.save();
};

userSchema.statics.getById = async function(id) {
  return await this.findById(id);
};

userSchema.statics.getByEmail = async function(email) {
  return await this.findOne({ email: email });
};

userSchema.statics.getAll = async function() {
  return await this.find({});
};

userSchema.statics.update = async function(id, data) {
  return await this.findByIdAndUpdate(id, data, { new: true });
};

userSchema.statics.delete = async function(id) {
  const result = await this.findByIdAndDelete(id);
  return result !== null;
};

const User = mongoose.model('User', userSchema);

module.exports = User;