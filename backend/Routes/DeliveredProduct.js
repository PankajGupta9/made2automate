// /server/routes/api.js
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel.js');
const DeliveredProduct = require('../models/DeliveredModel.js');

// Route to mark a product as delivered and move it to the DeliveredCollection
router.post('/deliver-product/:productId/deliver', async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the product
    const productToDeliver = await Product.findOne({ productId });

    if (!productToDeliver) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create a new DeliveredProduct document based on the found product
    const deliveredProduct = new DeliveredProduct(productToDeliver.toObject());
    
    // Save the delivered product to the DeliveredCollection
    await deliveredProduct.save();

    // Remove the product from the original collection
    await Product.deleteOne({ productId });

    res.json({ message: 'Product delivered and moved to DeliveredCollection successfully' });
  } catch (error) {
    console.error('Error delivering product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get delivered products
router.get('/get-delivered', async (req, res) => {
  try {
    const deliveredProducts = await DeliveredProduct.find();
    res.json(deliveredProducts);
  } catch (error) {
    console.error('Error fetching delivered products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
