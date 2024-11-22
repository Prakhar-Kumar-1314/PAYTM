import React from 'react';
import { Heart } from 'lucide-react';
import { Shoe } from '../types';
import { useStore } from '../store';

interface Props {
  shoe: Shoe;
}

export default function ShoeCard({ shoe }: Props) {
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(shoe.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img
          src={shoe.image}
          alt={shoe.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => toggleWishlist(shoe.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{shoe.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{shoe.brand}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">
            ${shoe.price.toFixed(2)}
          </span>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}