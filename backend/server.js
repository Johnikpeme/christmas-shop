const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Add CORS to allow frontend requests
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS

// Insert your Paystack test secret key here
const PAYSTACK_SECRET_KEY = 'sk_test_7a31f80a04c76038dc840bdb10ee09c79104583c'; // TODO: Replace with your Paystack test secret key

app.post('/api/verify-payment', async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === 'success') {
      res.status(200).json({ status: 'success', data: response.data.data });
    } else {
      res.status(400).json({ status: 'failed', message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.listen(3150, () => console.log('Server running on http://localhost:3150'));