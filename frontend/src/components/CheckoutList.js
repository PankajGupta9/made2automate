import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutList = () => {
  const [checkoutProducts, setCheckoutProducts] = useState([]);

  const fetchCheckoutProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/get-checkout');
      setCheckoutProducts(response.data);
    } catch (error) {
      console.error('Error fetching checkout products:', error);
    }
  };

  useEffect(() => {
    fetchCheckoutProducts();
  }, []);

  const handleDelivery = async (productId) => {
    try {
      // Send a POST request to mark the product as delivered
      await axios.post(`http://localhost:8080/api/deliver-product/${productId}/deliver`);

      // Update the UI by fetching the updated data
      fetchCheckoutProducts();
    } catch (error) {
      console.error('Error delivering product:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      {checkoutProducts.length === 0 ? (
        <p>No checkout products available.</p>
      ) : (
        <div className='flex'>
          <div className="gap-4 grid grid-cols-1 mr-auto">
            {checkoutProducts.map((product) => (
              <div key={product.productId} className="mb-4">
                <div className="bg-white p-6 rounded-lg shadow-md border border-black flex  ">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className=" gap-4 mb-4">
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

                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md ml-10 hover:bg-green-600 transition duration-300"
                    onClick={() => handleDelivery(product.productId)}
                  >
                    Delivered the Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutList;
