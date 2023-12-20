// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsMinecart } from 'react-icons/bs';
import { selectIsLoggedIn, logout } from '../redux/authSlice';


const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Additional logic for logging out (e.g., clear tokens, reset state)
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white text-xl font-bold">My React App</div>
            <div className="space-x-4 flex">
              <Link className="text-white" to="/">
                Home
              </Link>
              <Link className="text-white" to="/about">
                About
              </Link>
              <Link className="text-white" to="/dashboard">
                Dashoboard
              </Link>
              {isLoggedIn ? (
                <button className="text-white" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link className="text-white" to="/register">
                    Register
                  </Link>
                  <Link className="text-white" to="/login">
                    Login
                  </Link>
                  <div className='text-[30px]'>
                  <Link className="text-white" to="/cart"><BsMinecart /></Link>
                  <p className='text-white text-[15px] bg-[orange] rounded-[100%] text-center '>0</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
