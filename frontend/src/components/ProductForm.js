import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productId: '',
    manufacturerName: '',
    name: '',
    description: '',
    images: [],
    price: 0,
    quantity: 0,
    category: '',
    barcode: '',
    // Add other product details as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the formData to the backend API using Axios
      console.log("hello pankaj")
      const response = await axios.post("http://localhost:8080/api/products/create-product", formData);

      // Handle the response as needed
      console.log('Product added successfully:', response.data);

      // Optionally, you can reset the form after successful submission
      setFormData({
        productId: '',
        manufacturerName: '',
        name: '',
        description: '',
        images: [],
        price: 0,
        quantity: 0,
        category: '',
        barcode: '',
        // Add other product details as needed
      });
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error as needed
    }
  };
  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
    <form onSubmit={handleSubmit}>
      <label className="block mb-2">
        Product ID:
        <input
          className="border border-black p-2 w-full"
          type="text"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        Manufacturer Name:
        <input
          className="border border-black p-2 w-full"
          type="text"
          name="manufacturerName"
          value={formData.manufacturerName}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        Product Name:
        <input
          className="border border-black p-2 w-full"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        Description:
        <textarea
          className="border border-black p-2 w-full"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        Price:
        <input
          className="border border-black p-2 w-full"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        Quantity:
        <input
          className="border border-black p-2 w-full"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        Category:
        <input
          className="border border-black p-2 w-full"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <button
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
        type="submit"
      >
        Add Product
      </button>
    </form>
  </div>

  );
};

export default ProductForm;
