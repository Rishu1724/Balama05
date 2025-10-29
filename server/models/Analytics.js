const { db } = require('../config/firebase');

// Analytics model
class Analytics {
  // Get seller performance metrics
  static async getSellerPerformance(sellerId) {
    try {
      // Get total products
      const productsSnapshot = await db.collection('products')
        .where('sellerId', '==', sellerId)
        .get();
      
      const totalProducts = productsSnapshot.size;
      
      // Get total orders
      const ordersSnapshot = await db.collection('orders')
        .where('sellerId', '==', sellerId)
        .get();
      
      const totalOrders = ordersSnapshot.size;
      
      // Calculate total revenue (simplified)
      let totalRevenue = 0;
      ordersSnapshot.forEach(doc => {
        totalRevenue += doc.data().totalPrice || 0;
      });
      
      // Get seller ratings
      const reviewsSnapshot = await db.collection('reviews')
        .where('toUserId', '==', sellerId)
        .get();
      
      const totalReviews = reviewsSnapshot.size;
      let averageRating = 0;
      
      if (totalReviews > 0) {
        let ratingSum = 0;
        reviewsSnapshot.forEach(doc => {
          ratingSum += doc.data().rating || 0;
        });
        averageRating = ratingSum / totalReviews;
      }
      
      return {
        totalProducts,
        totalOrders,
        totalRevenue,
        totalReviews,
        averageRating
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get product analytics
  static async getProductAnalytics(productId) {
    try {
      const productDoc = await db.collection('products').doc(productId).get();
      
      if (!productDoc.exists) {
        return null;
      }
      
      const product = productDoc.data();
      
      // Get views and clicks
      const views = product.views || 0;
      const clicks = product.clicks || 0;
      
      // Calculate conversion rate
      let conversionRate = 0;
      if (views > 0) {
        // Get number of orders for this product
        const ordersSnapshot = await db.collection('orders')
          .where('productId', '==', productId)
          .get();
        
        const totalOrders = ordersSnapshot.size;
        conversionRate = (totalOrders / views) * 100;
      }
      
      return {
        views,
        clicks,
        conversionRate
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get buyer analytics
  static async getBuyerAnalytics(buyerId) {
    try {
      // Get total purchases
      const ordersSnapshot = await db.collection('orders')
        .where('buyerId', '==', buyerId)
        .get();
      
      const totalPurchases = ordersSnapshot.size;
      
      // Calculate total spent
      let totalSpent = 0;
      ordersSnapshot.forEach(doc => {
        totalSpent += doc.data().totalPrice || 0;
      });
      
      // Get buyer reviews
      const reviewsSnapshot = await db.collection('reviews')
        .where('fromUserId', '==', buyerId)
        .get();
      
      const totalReviews = reviewsSnapshot.size;
      
      return {
        totalPurchases,
        totalSpent,
        totalReviews
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Analytics;