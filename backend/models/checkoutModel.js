const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  productId: {
    type: String,
    // required: true,
  },
  manufacturerName: {
    type: String,
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
    type: String,
  }],
  price: {
    type: Number,
    // required: true,
  },
  quantity: {
    type: Number,
    // required: true,
  },
  category: {
    type: String,
  },
  barcode: {
    type: String,
  },
  // Add other fields as needed for your checkout data
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
