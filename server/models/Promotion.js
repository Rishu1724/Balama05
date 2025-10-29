const { db } = require('../config/firebase');

// Promotion model
class Promotion {
  constructor(data) {
    this.type = data.type; // featured, discount, banner
    this.productId = data.productId || null;
    this.discountCode = data.discountCode || null;
    this.discountType = data.discountType || 'percentage'; // percentage, fixed
    this.discountValue = data.discountValue || 0;
    this.expiryDate = data.expiryDate || null;
    this.duration = data.duration || 0; // in days
    this.views = data.views || 0;
    this.clicks = data.clicks || 0;
    this.createdAt = data.createdAt || new Date();
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  // Create a new promotion
  static async create(data) {
    const promotion = new Promotion(data);
    const docRef = await db.collection('promotions').add(promotion);
    return { id: docRef.id, ...promotion };
  }

  // Get a promotion by ID
  static async getById(id) {
    const doc = await db.collection('promotions').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Get all active promotions
  static async getActivePromotions() {
    const snapshot = await db.collection('promotions')
      .where('isActive', '==', true)
      .where('expiryDate', '>', new Date())
      .get();
    
    const promotions = [];
    snapshot.forEach(doc => {
      promotions.push({ id: doc.id, ...doc.data() });
    });
    return promotions;
  }

  // Get promotions by product ID
  static async getPromotionsByProduct(productId) {
    const snapshot = await db.collection('promotions')
      .where('productId', '==', productId)
      .get();
    
    const promotions = [];
    snapshot.forEach(doc => {
      promotions.push({ id: doc.id, ...doc.data() });
    });
    return promotions;
  }

  // Update a promotion
  static async update(id, data) {
    const promotion = await db.collection('promotions').doc(id).get();
    if (!promotion.exists) {
      return null;
    }
    
    await db.collection('promotions').doc(id).update(data);
    
    const updatedPromotion = await db.collection('promotions').doc(id).get();
    return { id: updatedPromotion.id, ...updatedPromotion.data() };
  }

  // Delete a promotion
  static async delete(id) {
    const promotion = await db.collection('promotions').doc(id).get();
    if (!promotion.exists) {
      return false;
    }
    
    await db.collection('promotions').doc(id).delete();
    return true;
  }

  // Increment views
  static async incrementViews(id) {
    const promotion = await db.collection('promotions').doc(id).get();
    if (!promotion.exists) {
      return null;
    }
    
    await db.collection('promotions').doc(id).update({
      views: promotion.data().views + 1
    });
    
    const updatedPromotion = await db.collection('promotions').doc(id).get();
    return { id: updatedPromotion.id, ...updatedPromotion.data() };
  }

  // Increment clicks
  static async incrementClicks(id) {
    const promotion = await db.collection('promotions').doc(id).get();
    if (!promotion.exists) {
      return null;
    }
    
    await db.collection('promotions').doc(id).update({
      clicks: promotion.data().clicks + 1
    });
    
    const updatedPromotion = await db.collection('promotions').doc(id).get();
    return { id: updatedPromotion.id, ...updatedPromotion.data() };
  }
}

module.exports = Promotion;