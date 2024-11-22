import React from 'react';
import { useStore } from '../store';
import ShoeCard from '../components/ShoeCard';

const SAMPLE_SHOES = [
  {
    id: '1',
    name: 'Air Max 270',
    brand: 'Nike',
    price: 150,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    sizes: [7, 8, 9, 10, 11],
    colors: ['black', 'white', 'red'],
    description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
  },
];

export default function Wishlist() {
  const { wishlist } = useStore();
  const wishlistedShoes = SAMPLE_SHOES.filter((shoe) => wishlist.includes(shoe.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      
      {wishlistedShoes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistedShoes.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      )}
    </div>
  );
}