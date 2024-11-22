import React from 'react';
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
  {
    id: '2',
    name: 'Ultra Boost',
    brand: 'Adidas',
    price: 180,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['white', 'black', 'blue'],
    description: 'Experience ultimate comfort with responsive Boost cushioning.',
  },
  {
    id: '3',
    name: 'Jordan 1 Retro High',
    brand: 'Jordan',
    price: 170,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    sizes: [8, 9, 10, 11, 12],
    colors: ['red', 'white', 'black'],
    description: 'The iconic silhouette that started it all.',
  },
  {
    id: '4',
    name: '990v5',
    brand: 'New Balance',
    price: 185,
    image: 'https://images.unsplash.com/photo-1578021046026-483fa99ffad2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    sizes: [7, 8, 9, 10, 11],
    colors: ['grey', 'navy'],
    description: 'Premium comfort and style made in the USA.',
  },
  {
    id: '5',
    name: 'Chuck 70 High Top',
    brand: 'Converse',
    price: 85,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ['black', 'white', 'red'],
    description: 'A timeless classic reimagined with modern comfort.',
  },
  {
    id: '6',
    name: 'Zoom Freak 4',
    brand: 'Nike',
    price: 130,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    sizes: [8, 9, 10, 11, 12, 13],
    colors: ['black', 'white', 'green'],
    description: 'Designed for explosive moves and superior traction.',
  },
];

export default function Shoes() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Shoes</h1>
        <div className="flex space-x-4">
          <select className="border rounded-md px-4 py-2">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
          <select className="border rounded-md px-4 py-2">
            <option>Filter by</option>
            <option>Running</option>
            <option>Lifestyle</option>
            <option>Basketball</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SAMPLE_SHOES.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}