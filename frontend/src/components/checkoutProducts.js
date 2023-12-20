// CheckoutList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutList = () => {
  const [checkoutProducts, setCheckoutProducts] = useState([]);

  useEffect(() => {
    const fetchCheckoutProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/get-checkout');
        setCheckoutProducts(response.data);
      } catch (error) {
        console.error('Error fetching checkout products:', error);
      }
    };

    fetchCheckoutProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout Product List</h2>
      {checkoutProducts.length === 0 ? (
        <p>No checkout products available.</p>
      ) : (
        <>
          {checkoutProducts.map((product) => (
            <div key={product.productId} className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index}`}
                    className="w-full h-auto"
                  />
                ))}
              </div>
              <p className="text-blue-500 mb-2">{`Price: $${product.price.toFixed(2)}`}</p>
              <p className="text-gray-500 mb-2">{`Quantity: ${product.quantity}`}</p>
              <p className="text-gray-500 mb-2">{`Manufacturer: ${product.manufacturerName}`}</p>
              <p className="text-gray-500 mb-2">{`Category: ${product.category}`}</p>
              {/* <p className="text-gray-500 mb-2">{`Barcode: ${product.barcode}`}</p> */}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CheckoutList;
