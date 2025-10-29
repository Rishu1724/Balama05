const { db } = require('../config/firebase');

// Wishlist model
class Wishlist {
  constructor(data) {
    this.name = data.name || 'My Wishlist';
    this.products = data.products || [];
    this.createdAt = data.createdAt || new Date();
  }

  // Create a new wishlist
  static async create(userId, data) {
    const wishlist = new Wishlist(data);
    const docRef = await db.collection('wishlists').doc(userId).collection('collections').add(wishlist);
    return { id: docRef.id, ...wishlist };
  }

  // Get all wishlists for a user
  static async getAll(userId) {
    const snapshot = await db.collection('wishlists').doc(userId).collection('collections').get();
    const wishlists = [];
    snapshot.forEach(doc => {
      wishlists.push({ id: doc.id, ...doc.data() });
    });
    return wishlists;
  }

  // Get a wishlist by ID
  static async getById(userId, id) {
    const doc = await db.collection('wishlists').doc(userId).collection('collections').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Update a wishlist
  static async update(userId, id, data) {
    const wishlist = await db.collection('wishlists').doc(userId).collection('collections').doc(id).get();
    if (!wishlist.exists) {
      return null;
    }
    
    await db.collection('wishlists').doc(userId).collection('collections').doc(id).update(data);
    
    const updatedWishlist = await db.collection('wishlists').doc(userId).collection('collections').doc(id).get();
    return { id: updatedWishlist.id, ...updatedWishlist.data() };
  }

  // Delete a wishlist
  static async delete(userId, id) {
    const wishlist = await db.collection('wishlists').doc(userId).collection('collections').doc(id).get();
    if (!wishlist.exists) {
      return false;
    }
    
    await db.collection('wishlists').doc(userId).collection('collections').doc(id).delete();
    return true;
  }
}

module.exports = Wishlist;