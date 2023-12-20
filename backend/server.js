// /server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/ProductRoutes.js');
const userRoutes = require('./Routes/userRoutes.js');
const checkoutRoutes = require('./Routes/CheckoutRoutes.js');
const DeliveredProduct = require('./Routes/DeliveredProduct.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
// Enable CORS
app.use(cors());


  try{
    const conn= mongoose.connect('mongodb+srv://root:8860125708@cluster1.njnnwfu.mongodb.net/productManagement',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDb' );

}
catch(error){
  console.log(`Error in MongoDb is ${error}`)
}

// Routes
app.use('/api/users', userRoutes);;
app.use('/api/products', productRoutes);
app.use('/api', checkoutRoutes);
app.use('/api/deliver-product', DeliveredProduct);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
