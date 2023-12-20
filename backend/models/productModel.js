// /server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    // required: true,
    unique: true,
  },
  manufacturerName: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  images: [{
    type: String, // You can store the image URLs or use a different data type based on your needs
  }],
  price: {
    type: Number,
    // required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    // required: true,
  },
  barcode: {
    type: String,
    // required: true,
  },
  // Add other product details as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
