const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  buyerId: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  shippingAddress: {
    type: Map,
    of: String,
    required: true
  },
  trackingNumber: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  deliveryDate: {
    type: Date,
    default: null
  },
  refundRequested: {
    type: Boolean,
    default: false
  },
  refundReason: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

// Static methods for Order model
orderSchema.statics = {
  // Create a new order
  async create(data) {
    const order = new this(data);
    return await order.save();
  },

  // Get an order by ID
  async getById(id) {
    return await this.findById(id);
  },

  // Get all orders
  async getAll() {
    return await this.find({});
  },

  // Update an order
  async update(id, data) {
    return await this.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete an order
  async delete(id) {
    const result = await this.findByIdAndDelete(id);
    return result !== null;
  }
};

module.exports = Order;