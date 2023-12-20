import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      
      <main className="container mx-auto mt-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <ProductList />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
          {/* Add your special offers or promotions here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow-md">
              {/* Special Offer 1 */}
              <h3 className="text-lg font-semibold mb-2">Special Offer 1</h3>
              <p className="text-gray-600">Description of the special offer.</p>
              <Link to="/special-offer-1" className="text-blue-500 mt-2 inline-block">View Details</Link>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              {/* Special Offer 2 */}
              <h3 className="text-lg font-semibold mb-2">Special Offer 2</h3>
              <p className="text-gray-600">Description of the special offer.</p>
              <Link to="/special-offer-2" className="text-blue-500 mt-2 inline-block">View Details</Link>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              {/* Special Offer 3 */}
              <h3 className="text-lg font-semibold mb-2">Special Offer 3</h3>
              <p className="text-gray-600">Description of the special offer.</p>
              <Link to="/special-offer-3" className="text-blue-500 mt-2 inline-block">View Details</Link>
            </div>
          </div>
        </section>
      </main>

     </div>
  );
};

export default Home;
