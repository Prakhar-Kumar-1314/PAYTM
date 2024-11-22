import React from 'react';
import { User2, Package, Heart, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

export default function Profile() {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Please log in to view your profile</h2>
          <Link
            to="/login"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <User2 className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            
            <nav className="space-y-2">
              <Link
                to="/orders"
                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
              >
                <Package className="w-5 h-5" />
                <span>Orders</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md text-red-500 w-full">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}