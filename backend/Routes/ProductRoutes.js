// /server/routes/productRoutes.js
const express = require('express');
const router = express.Router();

const Product = require('../models/productModel.js');
const barcodeGenerator = require('../utils/barcodeGenerator'); // Implement barcode generation logic

// Create a new product
router.post('/create-product', async (req, res) => {
  try {
    const { productId, manufacturerName, name, description, images, price, quantity, category } = req.body;
    const barcodeBuffer = await barcodeGenerator.generateBarcode(name, price);

    // Save the product with barcode and other details
    const product = new Product({
      productId,
      manufacturerName,
      name,
      description,
      images,
      price,
      quantity,
      category,
      barcode: barcodeBuffer.toString('base64'), // Convert PNG buffer to base64
      // Add other product details as needed
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
