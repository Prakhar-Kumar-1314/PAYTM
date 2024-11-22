import React from 'react';
import { Package } from 'lucide-react';

const SAMPLE_ORDERS = [
  {
    id: '1',
    items: [
      {
        shoeId: '1',
        size: 9,
        color: 'black',
        quantity: 1,
      },
    ],
    total: 150,
    status: 'delivered',
    date: '2024-03-15',
  },
];

export default function Orders() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      {SAMPLE_ORDERS.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {SAMPLE_ORDERS.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600 capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
                
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.shoeId}`}
                    className="flex items-center border-t pt-4"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="text-sm font-medium">Nike Air Max 270</h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}