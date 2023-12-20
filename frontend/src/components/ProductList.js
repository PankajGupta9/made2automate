import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product Image ${index}`} className="w-full h-auto" />
        ))}
      </div>
      <p className="text-blue-500 mb-2">{`Price: $${product.price.toFixed(2)}`}</p>
      <p className="text-gray-500 mb-2">{`Quantity: ${product.quantity}`}</p>
      <p className="text-gray-500 mb-2">{`Manufacturer: ${product.manufacturerName}`}</p>
      <p className="text-gray-500 mb-2">{`Category: ${product.category}`}</p>
      {/* <p className="text-gray-500 mb-2">{`Barcode: ${product.barcode}`}</p> */}
      {product.quantity > 0 ? (
        <button
          onClick={() => handleAddToCart(product.productId, product.quantity)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600"
        >
          Add to Cart
        </button>
      ) : (
        <p className="text-red-500">Out of Stock</p>
      )}
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/get-products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId, quantity) => {
    const selectedProduct = products.find((product) => product.productId === productId);

    if (quantity > 0) {
      dispatch(addToCart(selectedProduct));
      toast.success('Added to Cart');
    } else {
      toast.error('This product is out of stock.');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} handleAddToCart={handleAddToCart} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductList;
