// /client/src/App.js
import React from 'react';
import ProductForm from './components/ProductForm';
import BarcodeScanner from './components/BarcodeScanner';
import {Toaster} from 'react-hot-toast';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home'
import Header from './components/Header';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CheckoutList from './components/CheckoutList';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <BarcodeScanner />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addProduct' element={<ProductForm />}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Checkoutlist' element={<CheckoutList/>}/>
        </Routes>
        <Footer/>
        <Toaster/>
      </BrowserRouter>
    </div>
  );
}

export default App;
