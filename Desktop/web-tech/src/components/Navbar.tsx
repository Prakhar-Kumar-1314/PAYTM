import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User2, LogOut } from 'lucide-react';
import { useStore } from '../store';

export default function Navbar() {
  const { user, cart } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold">KicksCommerce</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/shoes" className="text-gray-700 hover:text-indigo-600">
              Shop
            </Link>
            {user ? (
              <>
                <Link to="/wishlist" className="relative">
                  <Heart className="w-6 h-6 text-gray-700 hover:text-indigo-600" />
                </Link>
                <Link to="/cart" className="relative">
                  <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-indigo-600" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="relative">
                  <User2 className="w-6 h-6 text-gray-700 hover:text-indigo-600" />
                </Link>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}