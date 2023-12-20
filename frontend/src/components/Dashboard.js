import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CheckoutList from './CheckoutList';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    newStocks: 0,
    deadStocks: 0,
    totalLeads: 0,
    totalRevenue: 0,
  });
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [displayAllLeads, setDisplayAllLeads] = useState(false); // New state
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/get-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const products = response.data;

        // Fetch the total number of products in the checkout collection
        try {
          const checkoutResponse = await axios.get('http://localhost:8080/api/get-checkout', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const checkoutProducts = checkoutResponse.data;

          setDashboardData({
            totalOrders: calculateTotalOrders(products),
            newStocks: calculateNewStocks(products),
            deadStocks: calculateDeadStocks(products),
            totalLeads: calculateTotalLeads(checkoutProducts),
            totalRevenue: calculateTotalRevenue(products),
          });

          setCheckoutProducts(displayAllLeads ? checkoutProducts : checkoutProducts.slice(0, 2)); // Display all or first 2 products
        } catch (error) {
          console.error('Error fetching checkout data:', error);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, [token, displayAllLeads]); // Include displayAllLeads in the dependency array

  const calculateTotalOrders = (products) => {
    return products.length;
  };

  const calculateNewStocks = (products) => {
    return products.length;
  };

  const calculateDeadStocks = (products) => {
    return products.filter((product) => product.quantity === 0).length;
  };

  const calculateTotalLeads = (checkoutProducts) => {
    return checkoutProducts.length;
  };

  const calculateTotalRevenue = (products) => {
    const totalRevenue = products.reduce((accumulator, product) => {
      const productPrice = product.price || 0;
      return accumulator + productPrice;
    }, 0);

    return totalRevenue;
  };

  const handleViewAllLeads = () => {
    setDisplayAllLeads(true);
  };

  return (
    <div className='grid grid-cols-1 bg-blue-100 gap-2'>
      <h2 className='text-lg p-3 mr-5'>Made2Automate</h2>

      <div className='h-[150px] grid grid-cols-5 bg-blue-100  m-5 gap-2'>
        {/* Display dynamic data fetched from the server */}
        <div className="bg-white border border-black rounded-lg m-4">
          <p className='text-[blue] text-[40px] font-bold text-center'>{dashboardData.totalOrders}</p>
          <h1 className='text-black text-center '>Total Orders</h1>
        </div>
        <div className="bg-white border  border-black rounded-lg m-4">
          <p className='text-[#efb23f] text-[40px] font-bold text-center'>{dashboardData.newStocks}</p>
          <h1 className='text-black text-center '>New Stocks</h1>
        </div>
        <div className="bg-white border  border-black rounded-lg m-4">
          <p className='text-[#68efe6] text-[40px] font-bold text-center'>{dashboardData.deadStocks}</p>
          <h1 className='text-black text-center '>Dead Stocks</h1>
        </div>
        <div className="bg-white border  border-black rounded-lg m-4">
          <p className='text-[black] text-[40px] font-bold text-center'>{dashboardData.totalLeads}</p>
          <h1 className='text-black text-center '>Total Leads</h1>
        </div>
        <div className="bg-white border  border-black rounded-lg m-4">
          <p className='text-black text-[20px] font-bold text-center'>{dashboardData.totalRevenue}</p>
          <h1 className='text-black text-center '>Total Revenue</h1>
        </div>
      </div>

      <div className='h-[150px] border bg-white border-black rounded-lg m-5 flex justify-between'>
        <h1 className='p-2 font-bold'>Total Orders</h1>
        <div>
          <button className='bg-[blue] text-white  rounded-lg p-2 m-2 '>View All</button>
        </div>
      </div>


  <div className='h-[250px] border bg-white border-black rounded-lg m-5  justify-between overflow-x-hidden'>
      <div className='flex justify-between'>
          <h1 className='p-2 font-bold'>Total Leads</h1>
          <div> {/* Add flex container */}
          <button className='bg-[blue] text-white rounded-lg p-2 m-2 ' onClick={handleViewAllLeads}>View All</button>
          </div>
      </div>
       
       <div>
       <div className='m-3'>
     <CheckoutList checkoutProducts={checkoutProducts} />
    </div>

       </div>

  </div>

      <div className='flex'>
        <button className='bg-[blue] text-white p-2 rounded-lg ml-auto'>
          <Link to='/addProduct'>ADD PRODUCT</Link>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
