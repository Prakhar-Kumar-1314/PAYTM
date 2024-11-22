import React from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store';

export default function Cart() {
  const { cart, removeFromCart } = useStore();

  const total = cart.reduce((sum, item) => sum + item.quantity * 150, 0); // Simplified price calculation

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <div key={item.shoeId} className="flex items-center border-b py-4">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  alt="Product"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">Nike Air Max 270</h3>
                  <p className="text-gray-600">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-indigo-600 font-semibold">
                      ${(150 * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.shoeId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}