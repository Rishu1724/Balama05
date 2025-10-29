// Payment controller
let stripe;

try {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  console.log('Stripe not configured. Running in mock mode.');
  // Mock implementation for development
  stripe = {
    charges: {
      create: async () => ({ id: 'mock-charge-id', status: 'succeeded' })
    },
    refunds: {
      create: async () => ({ id: 'mock-refund-id', status: 'succeeded' })
    }
  };
}

// Process a payment
const processPayment = async (req, res) => {
  try {
    const { amount, currency, token } = req.body;
    
    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount: amount * 100, // Convert to cents
      currency: currency || 'usd',
      source: token, // Token from frontend
      description: 'Balama Marketplace Payment'
    });
    
    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      charge
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get payment history
const getPaymentHistory = async (req, res) => {
  try {
    // In a real app, you would fetch payment history from your database
    // For now, we'll return an empty array
    res.status(200).json({
      success: true,
      payments: []
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Process a refund
const processRefund = async (req, res) => {
  try {
    const { chargeId, amount } = req.body;
    
    // Create a refund using Stripe
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: amount * 100 // Convert to cents
    });
    
    res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      refund
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  processPayment,
  getPaymentHistory,
  processRefund
};