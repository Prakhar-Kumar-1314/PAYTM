import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Truck, Clock } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt="Background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to KicksCommerce
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Your premier destination for exclusive sneakers. Discover the latest trends,
              limited editions, and classic favorites all in one place.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-900"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Secure Shopping</h3>
              <p className="mt-2 text-base text-gray-500">
                Shop with confidence with our secure payment system and buyer protection.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Truck className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-base text-gray-500">
                Quick and reliable shipping to your doorstep with real-time tracking.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Clock className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-base text-gray-500">
                Our customer service team is always here to help you with any questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Featured Brands
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {['Nike', 'Adidas', 'Jordan', 'New Balance'].map((brand) => (
              <div
                key={brand}
                className="col-span-1 flex justify-center items-center bg-white rounded-lg p-8"
              >
                <span className="text-xl font-bold text-gray-900">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}