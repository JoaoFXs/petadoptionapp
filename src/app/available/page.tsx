'use client';
import { InputText, Template } from '@/components';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  imageUrl: string;
}

export interface AvailablePetsProps {
  children?: React.ReactNode;
}

const mockPets: Pet[] = [
  {
    id: 1,
    name: 'Bolt',
    breed: 'Labrador',
    age: '2',
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-58e5f2dfd597?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Poodle',
    age: '3',
    imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4dc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Max',
    breed: 'Bulldog',
    age: '1',
    imageUrl: 'https://images.unsplash.com/photo-1598134493279-7cd330b65dbb?auto=format&fit=crop&w=400&q=80',
  },
];

const Available: React.FC<AvailablePetsProps> = () => {
  const [query, setQuery] = useState('');
  
  return (
    <Template>
      <section className="py-10 px-4 max-w-7xl mx-auto">
        {/* Barra de pesquisa */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search by name or breed..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-xl px-6 py-3 rounded-full border border-green-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />

          

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPets.map((pet) => (
            <motion.div
              key={pet.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-white shadow-md rounded-2xl overflow-hidden border border-green-100 hover:shadow-xl transition-all"
            >
              <div className="overflow-hidden">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-bold text-green-700">{pet.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Breed: {pet.breed}</p>
                <p className="text-sm text-gray-500">Age: {pet.age}</p>
                <button className="mt-5 w-full bg-gradient-to-r bg-green-300  hover:from-green-500 hover:to-green-600 text-green-800 py-2 px-4 rounded-xl shadow-sm transition duration-300">
                  See more...
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Template>
  );
};

export default Available;
