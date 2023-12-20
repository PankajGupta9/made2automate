const express = require('express');
const router = express.Router();
const Checkout = require('../models/checkoutModel.js');
const mongoose = require('mongoose');

// Route to handle checkout and update the database
router.post('/checkout', async (req, res) => {
  const { cart } = req.body;

  try {
    // Process the checkout logic here, using a custom identifier
    const checkoutItems = cart.map(item => ({
      productId: item.productId, // Ensure it's a string
      quantity: item.quantity,
      // Add other fields as needed for your checkout data
      name: item.name,
      description: item.description,
      images: item.images,
      price: item.price,
      manufacturerName: item.manufacturerName,
      category: item.category,
      barcode: item.barcode,
      // Add other fields as needed for your checkout data
    }));

    // Save checkout items to the Checkout model one by one
    for (const item of checkoutItems) {
      await Checkout.create(item);
    }

    // Clear the cart in your actual application
    // (you might want to do this on the client side after receiving a successful response)
    // e.g., dispatch({ type: 'cart/clearCart' });

    res.status(200).json({ success: true, message: 'Checkout successful' });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/get-checkout', async (req, res) => {
  try {
    const checkoutData = await Checkout.find();
    res.json(checkoutData);
  } catch (error) {
    console.error('Error fetching checkout data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
