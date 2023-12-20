import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeliveredList = () => {
  const [deliveredProducts, setDeliveredProducts] = useState([]);

  const fetchDeliveredProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/get-delivered');
      setDeliveredProducts(response.data);
    } catch (error) {
      console.error('Error fetching delivered products:', error);
    }
  };

  useEffect(() => {
    fetchDeliveredProducts();
  }, []);

  return (
    <div className="overflow-x-auto">
      {deliveredProducts.length === 0 ? (
        <p>No delivered products available.</p>
      ) : (
        <div className='flex'>
          <div className="gap-4 grid grid-cols-1 mr-auto">
            {deliveredProducts.map((product) => (
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
                  {/* Add other fields as needed */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveredList;
