const { db } = require('../config/firebase');

// Earnings model
class Earnings {
  constructor(data) {
    this.totalEarnings = data.totalEarnings || 0;
    this.pendingEarnings = data.pendingEarnings || 0;
    this.paidOutEarnings = data.paidOutEarnings || 0;
    this.transactionHistory = data.transactionHistory || [];
    this.payoutSchedule = data.payoutSchedule || 'weekly'; // weekly, monthly, manual
    this.bankDetails = data.bankDetails || {}; // This should be encrypted in a real app
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Create or update earnings for a seller
  static async createOrUpdate(sellerId, data) {
    const earnings = new Earnings(data);
    await db.collection('earnings').doc(sellerId).set(earnings);
    return { id: sellerId, ...earnings };
  }

  // Get earnings by seller ID
  static async getBySellerId(sellerId) {
    const doc = await db.collection('earnings').doc(sellerId).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Update earnings
  static async update(sellerId, data) {
    const earnings = await db.collection('earnings').doc(sellerId).get();
    if (!earnings.exists) {
      return null;
    }
    
    await db.collection('earnings').doc(sellerId).update({
      ...data,
      updatedAt: new Date()
    });
    
    const updatedEarnings = await db.collection('earnings').doc(sellerId).get();
    return { id: updatedEarnings.id, ...updatedEarnings.data() };
  }

  // Add a transaction to history
  static async addTransaction(sellerId, transaction) {
    const earnings = await db.collection('earnings').doc(sellerId).get();
    if (!earnings.exists) {
      return null;
    }
    
    const transactionHistory = [...earnings.data().transactionHistory, transaction];
    
    await db.collection('earnings').doc(sellerId).update({
      transactionHistory,
      updatedAt: new Date()
    });
    
    const updatedEarnings = await db.collection('earnings').doc(sellerId).get();
    return { id: updatedEarnings.id, ...updatedEarnings.data() };
  }

  // Request a payout
  static async requestPayout(sellerId, amount) {
    const earnings = await db.collection('earnings').doc(sellerId).get();
    if (!earnings.exists) {
      return null;
    }
    
    const currentEarnings = earnings.data();
    
    if (currentEarnings.pendingEarnings < amount) {
      throw new Error('Insufficient pending earnings');
    }
    
    const updatedEarnings = {
      pendingEarnings: currentEarnings.pendingEarnings - amount,
      paidOutEarnings: currentEarnings.paidOutEarnings + amount
    };
    
    await db.collection('earnings').doc(sellerId).update({
      ...updatedEarnings,
      updatedAt: new Date()
    });
    
    // Add transaction to history
    const transaction = {
      type: 'payout',
      amount,
      date: new Date(),
      status: 'completed'
    };
    
    await db.collection('earnings').doc(sellerId).update({
      transactionHistory: [...currentEarnings.transactionHistory, transaction]
    });
    
    const finalEarnings = await db.collection('earnings').doc(sellerId).get();
    return { id: finalEarnings.id, ...finalEarnings.data() };
  }
}

module.exports = Earnings;