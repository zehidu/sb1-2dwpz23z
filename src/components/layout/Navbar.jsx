import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styled from 'styled-components';

const TopBanner = styled(Box)`
  background-color: #007BFF;
  color: white;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
`;

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <>
      <TopBanner>
        Free shipping on all orders over $50!
      </TopBanner>
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <ShoppingCart className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold">Soccer Jersey Store</span>
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Home
                </Link>
                <Link to="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Jerseys
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/cart" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                  <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    <User className="h-5 w-5" />
                  </Link>
                  <button 
                    onClick={logout}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Login
                  </Link>
                  <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;