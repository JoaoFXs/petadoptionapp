'use client';
import { InputText, Template } from '@/components';
import React, { useState } from 'react';
import { usePetService } from '@/resources/pet/pet.service';
import { Button, PetCard } from '@/components';
import { Pet } from '@/resources';

export interface AvailablePetsProps {
  children?: React.ReactNode;
}

const Available: React.FC<AvailablePetsProps> = () => {
  const [query, setQuery] = useState('');
  const [available, setAvailable] = useState<boolean | null>(null); // null = sem filtro
  const [pets, setPets] = useState<Pet[]>([]);
  const usePet = usePetService();

  async function searchPets() {
    const resultPets = await usePet.search(query.trim(), available);
    setPets(resultPets);
  }

  function toggleAvailable() {
    setAvailable(prev => {
      const newAvailable = prev === true ? false : prev === false ? null : true;
      return newAvailable;
    });
  }

  function renderPetsCard(pet: Pet) {
    return (
      <PetCard
        key={pet?.url}
        name={pet?.name}
        breed={pet?.breed}
        age={pet?.age}
        url={pet?.url}
      />
    );
  }

  function renderPets() {
    return pets.map(renderPetsCard);
  }

  function getAvailableLabel() {
    if (available === true) return 'Available';
    if (available === false) return 'Not Available';
    return 'All';
  }

  return (
    <Template>
      <section className="py-10 px-4 max-w-7xl mx-auto">
        {/* Barra de pesquisa */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center mb-10">
          <input
            type="text"
            placeholder="Search by name or breed..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:max-w-xl px-6 py-3 rounded-full border border-green-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />

          <div className="flex flex-col sm:flex-row gap-4 sm:ml-4">
            <button
              onClick={searchPets}
              type="submit"
              className="px-5 py-3 rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 shadow-md transition"
            >
              Search
            </button>

            <button
              onClick={toggleAvailable}
              type="button"
              className={`px-5 py-3 rounded-full font-semibold transition-all duration-200
                ${
                  available === true
                    ? 'bg-yellow-500 text-white ring-2 ring-yellow-700 shadow-sm'
                    : available === false
                    ? 'bg-red-500 text-white ring-2 ring-red-700 shadow-sm'
                    : 'bg-gray-200 text-gray-600 shadow-lg'
                }
              `}
            >
              {getAvailableLabel()}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderPets()}
        </div>
      </section>
    </Template>
  );
};

export default Available;
