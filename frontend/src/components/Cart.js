import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, selectCart } from '../redux/cartSlice';
import { startCheckout, completeCheckout } from '../redux/checkoutSlice';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const handleCheckout = async () => {
    dispatch(startCheckout());

    try {
      // Make an API call to the server to post the cart items for checkout
      const response = await fetch('http://localhost:8080/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (response.ok) {
        // Clear the cart in your Redux store on successful checkout
        dispatch(completeCheckout());
        dispatch(clearCart());
        toast.success('Checkout successful');
      } else {
        // Handle errors if the server returns an error status
        toast.error('Error during checkout. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle other errors such as network issues
      toast.error('Error during checkout. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cart.map((item) => (
              <div key={item.productId} className="border p-4 rounded-md shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-blue-500 mb-2">{`Price: $${item.price.toFixed(2)}`}</p>
                <p className="text-gray-500 mb-2">{`Quantity: ${item.quantity}`}</p>
                <p className="text-gray-500 mb-2">{`Manufacturer: ${item.manufacturerName}`}</p>
                <p className="text-gray-500 mb-2">{`Category: ${item.category}`}</p>
                {/* <p className="text-gray-500 mb-2">{`Barcode: ${item.barcode}`}</p> */}
                {/* Add other product details as needed */}
              </div>
            ))}
          </div>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-green-600 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
