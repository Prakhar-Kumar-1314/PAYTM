import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-[600px] rounded-2xl overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="max-w-2xl mx-8">
            <h1 className="text-5xl font-bold text-white mb-6">
              Step into Style with Our Latest Collection
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover the perfect blend of comfort and fashion with our curated
              selection of premium footwear.
            </p>
            <Link
              to="/shoes"
              className="inline-flex items-center bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: 'Running',
            image:
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
          },
          {
            title: 'Lifestyle',
            image:
              'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
          },
          {
            title: 'Basketball',
            image:
              'https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
          },
        ].map((category) => (
          <Link
            key={category.title}
            to="/shoes"
            className="relative h-64 rounded-lg overflow-hidden group"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}