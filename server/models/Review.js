const { db } = require('../config/firebase');

// Review model
class Review {
  constructor(data) {
    this.fromUserId = data.fromUserId;
    this.toUserId = data.toUserId;
    this.productId = data.productId;
    this.orderId = data.orderId;
    this.rating = data.rating;
    this.comment = data.comment || '';
    this.images = data.images || [];
    this.helpful = data.helpful || 0;
    this.createdAt = data.createdAt || new Date();
    this.type = data.type || 'buyer'; // buyer or seller
  }

  // Create a new review
  static async create(data) {
    const review = new Review(data);
    const docRef = await db.collection('reviews').add(review);
    return { id: docRef.id, ...review };
  }

  // Get a review by ID
  static async getById(id) {
    const doc = await db.collection('reviews').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Get reviews for a user
  static async getReviewsForUser(userId) {
    const snapshot = await db.collection('reviews')
      .where('toUserId', '==', userId)
      .get();
    
    const reviews = [];
    snapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return reviews;
  }

  // Get reviews for a product
  static async getReviewsForProduct(productId) {
    const snapshot = await db.collection('reviews')
      .where('productId', '==', productId)
      .get();
    
    const reviews = [];
    snapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return reviews;
  }

  // Update a review
  static async update(id, data) {
    const review = await db.collection('reviews').doc(id).get();
    if (!review.exists) {
      return null;
    }
    
    await db.collection('reviews').doc(id).update(data);
    
    const updatedReview = await db.collection('reviews').doc(id).get();
    return { id: updatedReview.id, ...updatedReview.data() };
  }

  // Delete a review
  static async delete(id) {
    const review = await db.collection('reviews').doc(id).get();
    if (!review.exists) {
      return false;
    }
    
    await db.collection('reviews').doc(id).delete();
    return true;
  }
}

module.exports = Review;