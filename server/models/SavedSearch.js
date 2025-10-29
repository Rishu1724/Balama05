const { db } = require('../config/firebase');

// SavedSearch model
class SavedSearch {
  constructor(data) {
    this.query = data.query || '';
    this.filters = data.filters || {};
    this.createdAt = data.createdAt || new Date();
    this.notificationsEnabled = data.notificationsEnabled || false;
  }

  // Create a new saved search
  static async create(userId, data) {
    const savedSearch = new SavedSearch(data);
    const docRef = await db.collection('savedSearches').doc(userId).collection('userSearches').add(savedSearch);
    return { id: docRef.id, ...savedSearch };
  }

  // Get all saved searches for a user
  static async getAll(userId) {
    const snapshot = await db.collection('savedSearches').doc(userId).collection('userSearches').get();
    const savedSearches = [];
    snapshot.forEach(doc => {
      savedSearches.push({ id: doc.id, ...doc.data() });
    });
    return savedSearches;
  }

  // Get a saved search by ID
  static async getById(userId, id) {
    const doc = await db.collection('savedSearches').doc(userId).collection('userSearches').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Update a saved search
  static async update(userId, id, data) {
    const savedSearch = await db.collection('savedSearches').doc(userId).collection('userSearches').doc(id).get();
    if (!savedSearch.exists) {
      return null;
    }
    
    await db.collection('savedSearches').doc(userId).collection('userSearches').doc(id).update(data);
    
    const updatedSavedSearch = await db.collection('savedSearches').doc(userId).collection('userSearches').doc(id).get();
    return { id: updatedSavedSearch.id, ...updatedSavedSearch.data() };
  }

  // Delete a saved search
  static async delete(userId, id) {
    const savedSearch = await db.collection('savedSearches').doc(userId).collection('userSearches').doc(id).get();
    if (!savedSearch.exists) {
      return false;
    }
    
    await db.collection('savedSearches').doc(userId).collection('userSearches').doc(id).delete();
    return true;
  }
}

module.exports = SavedSearch;