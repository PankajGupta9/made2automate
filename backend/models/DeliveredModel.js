// /server/models/DeliveredModel.js
const mongoose = require('mongoose');

const deliveredProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
  },
  manufacturerName: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [{
    type: String,
  }],
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  barcode: {
    type: String,
  },
  // Add other fields as needed
});

const DeliveredProduct = mongoose.model('DeliveredProduct', deliveredProductSchema);

module.exports = DeliveredProduct;
