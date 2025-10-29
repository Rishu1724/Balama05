const { db } = require('../config/firebase');

// StoreProfile model
class StoreProfile {
  constructor(data) {
    this.storeName = data.storeName || '';
    this.storeDescription = data.storeDescription || '';
    this.storeLogo = data.storeLogo || '';
    this.storeBanner = data.storeBanner || '';
    this.businessHours = data.businessHours || {};
    this.responseTime = data.responseTime || 0;
    this.responseRate = data.responseRate || 0;
    this.totalSalesCount = data.totalSalesCount || 0;
    this.verificationStatus = data.verificationStatus || 'pending'; // pending, verified, rejected
    this.kycDocuments = data.kycDocuments || [];
    this.bankDetails = data.bankDetails || {}; // This should be encrypted in a real app
  }

  // Create or update a store profile
  static async createOrUpdate(sellerId, data) {
    const storeProfile = new StoreProfile(data);
    await db.collection('storeProfiles').doc(sellerId).set(storeProfile);
    return { id: sellerId, ...storeProfile };
  }

  // Get a store profile by seller ID
  static async getBySellerId(sellerId) {
    const doc = await db.collection('storeProfiles').doc(sellerId).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Update a store profile
  static async update(sellerId, data) {
    const storeProfile = await db.collection('storeProfiles').doc(sellerId).get();
    if (!storeProfile.exists) {
      return null;
    }
    
    await db.collection('storeProfiles').doc(sellerId).update(data);
    
    const updatedStoreProfile = await db.collection('storeProfiles').doc(sellerId).get();
    return { id: updatedStoreProfile.id, ...updatedStoreProfile.data() };
  }

  // Delete a store profile
  static async delete(sellerId) {
    const storeProfile = await db.collection('storeProfiles').doc(sellerId).get();
    if (!storeProfile.exists) {
      return false;
    }
    
    await db.collection('storeProfiles').doc(sellerId).delete();
    return true;
  }
}

module.exports = StoreProfile;