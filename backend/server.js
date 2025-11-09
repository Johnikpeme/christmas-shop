const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises; // For file-based storage
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true
}));

const PAYSTACK_SECRET_KEY = 'sk_test_7a31f80a04c76038dc840bdb10ee09c79104583c';
const ORDERS_FILE = path.join(__dirname, 'orders.json');

// Initialize orders file if it doesn't exist
async function initializeOrdersFile() {
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, JSON.stringify([], null, 2));
  }
}

app.post('/api/verify-payment', async (req, res) => {
  const { reference, orderData } = req.body; // Accept order data from frontend
  
  try {
    // Verify with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const transaction = response.data.data;

    if (transaction.status === 'success') {
      // Store order details
      const order = {
        id: `ORD-${Date.now()}`,
        reference: transaction.reference,
        customer: {
          email: transaction.customer.email,
          firstName: transaction.customer.first_name || '',
          lastName: transaction.customer.last_name || '',
          phone: orderData?.phone || '',
        },
        amount: transaction.amount / 100, // Convert kobo to naira
        deliveryAddress: orderData?.deliveryAddress || '',
        items: orderData?.items || [],
        subtotal: orderData?.subtotal || 0,
        deliveryFee: orderData?.deliveryFee || 0,
        total: transaction.amount / 100,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        estimatedDelivery: calculateEstimatedDelivery(orderData?.deliveryAddress)
      };

      // Save to file (in production, use database)
      await initializeOrdersFile();
      const orders = JSON.parse(await fs.readFile(ORDERS_FILE, 'utf8'));
      orders.push(order);
      await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));

      // Send email confirmation (implement with nodemailer in production)
      console.log('Order saved:', order.id);

      res.status(200).json({ 
        status: 'success', 
        data: {
          ...transaction,
          orderId: order.id,
          estimatedDelivery: order.estimatedDelivery
        }
      });
    } else {
      res.status(400).json({ 
        status: 'failed', 
        message: 'Payment verification failed' 
      });
    }
  } catch (error) {
    console.error('Verification error:', error.response?.data || error.message);
    res.status(500).json({ 
      status: 'error', 
      message: 'Payment verification failed. Please try again.' 
    });
  }
});

// Helper function to calculate delivery time
function calculateEstimatedDelivery(address) {
  const normalizedAddress = address?.toLowerCase() || '';
  if (normalizedAddress.includes('abuja') || normalizedAddress.includes('fct')) {
    return '24-48 hours';
  } else if (normalizedAddress.includes('lagos')) {
    return '2-3 days';
  }
  return '3-5 business days';
}

// Get order details by reference (for status checking)
app.get('/api/order/:reference', async (req, res) => {
  try {
    await initializeOrdersFile();
    const orders = JSON.parse(await fs.readFile(ORDERS_FILE, 'utf8'));
    const order = orders.find(o => o.reference === req.params.reference);
    
    if (order) {
      res.json({ status: 'success', order });
    } else {
      res.status(404).json({ status: 'not_found', message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

app.listen(3150, () => {
  console.log('🚀 Payment server running on http://localhost:3150');
});