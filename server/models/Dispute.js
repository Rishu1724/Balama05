const { db } = require('../config/firebase');

// Dispute model
class Dispute {
  constructor(data) {
    this.orderId = data.orderId;
    this.buyerId = data.buyerId;
    this.sellerId = data.sellerId;
    this.reason = data.reason;
    this.status = data.status || 'open'; // open, in_review, resolved
    this.resolution = data.resolution || '';
    this.createdAt = data.createdAt || new Date();
    this.resolvedAt = data.resolvedAt || null;
  }

  // Create a new dispute
  static async create(data) {
    const dispute = new Dispute(data);
    const docRef = await db.collection('disputes').add(dispute);
    return { id: docRef.id, ...dispute };
  }

  // Get a dispute by ID
  static async getById(id) {
    const doc = await db.collection('disputes').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Get disputes for an order
  static async getDisputesForOrder(orderId) {
    const snapshot = await db.collection('disputes')
      .where('orderId', '==', orderId)
      .get();
    
    const disputes = [];
    snapshot.forEach(doc => {
      disputes.push({ id: doc.id, ...doc.data() });
    });
    return disputes;
  }

  // Get disputes for a user
  static async getDisputesForUser(userId) {
    const buyerDisputesSnapshot = await db.collection('disputes')
      .where('buyerId', '==', userId)
      .get();
    
    const sellerDisputesSnapshot = await db.collection('disputes')
      .where('sellerId', '==', userId)
      .get();
    
    const disputes = [];
    buyerDisputesSnapshot.forEach(doc => {
      disputes.push({ id: doc.id, ...doc.data() });
    });
    sellerDisputesSnapshot.forEach(doc => {
      disputes.push({ id: doc.id, ...doc.data() });
    });
    
    return disputes;
  }

  // Update a dispute
  static async update(id, data) {
    const dispute = await db.collection('disputes').doc(id).get();
    if (!dispute.exists) {
      return null;
    }
    
    await db.collection('disputes').doc(id).update(data);
    
    const updatedDispute = await db.collection('disputes').doc(id).get();
    return { id: updatedDispute.id, ...updatedDispute.data() };
  }

  // Delete a dispute
  static async delete(id) {
    const dispute = await db.collection('disputes').doc(id).get();
    if (!dispute.exists) {
      return false;
    }
    
    await db.collection('disputes').doc(id).delete();
    return true;
  }
}

module.exports = Dispute;