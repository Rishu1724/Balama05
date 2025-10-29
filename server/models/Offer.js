const { db } = require('../config/firebase');

// Offer model
class Offer {
  constructor(data) {
    this.productId = data.productId;
    this.buyerId = data.buyerId;
    this.sellerId = data.sellerId;
    this.offeredPrice = data.offeredPrice;
    this.message = data.message || '';
    this.status = data.status || 'pending'; // pending, accepted, rejected, expired
    this.createdAt = data.createdAt || new Date();
    this.expiresAt = data.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    this.updatedAt = data.updatedAt || new Date();
  }

  // Create a new offer
  static async create(data) {
    const offer = new Offer(data);
    const docRef = await db.collection('offers').add(offer);
    return { id: docRef.id, ...offer };
  }

  // Get an offer by ID
  static async getById(id) {
    const doc = await db.collection('offers').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Get offers for a product
  static async getOffersForProduct(productId) {
    const snapshot = await db.collection('offers')
      .where('productId', '==', productId)
      .get();
    
    const offers = [];
    snapshot.forEach(doc => {
      offers.push({ id: doc.id, ...doc.data() });
    });
    return offers;
  }

  // Get offers for a buyer
  static async getOffersForBuyer(buyerId) {
    const snapshot = await db.collection('offers')
      .where('buyerId', '==', buyerId)
      .get();
    
    const offers = [];
    snapshot.forEach(doc => {
      offers.push({ id: doc.id, ...doc.data() });
    });
    return offers;
  }

  // Update an offer
  static async update(id, data) {
    const offer = await db.collection('offers').doc(id).get();
    if (!offer.exists) {
      return null;
    }
    
    await db.collection('offers').doc(id).update({
      ...data,
      updatedAt: new Date()
    });
    
    const updatedOffer = await db.collection('offers').doc(id).get();
    return { id: updatedOffer.id, ...updatedOffer.data() };
  }

  // Delete an offer
  static async delete(id) {
    const offer = await db.collection('offers').doc(id).get();
    if (!offer.exists) {
      return false;
    }
    
    await db.collection('offers').doc(id).delete();
    return true;
  }
}

module.exports = Offer;