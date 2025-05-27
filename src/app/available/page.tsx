'use client';
import { InputText, Template } from '@/components';
import React, { useState } from 'react';
import { usePetService } from '@/resources/pet/pet.service';
import { Button, PetCard } from '@/components';
import { Pet }from '@/resources'


export interface AvailablePetsProps {
  children?: React.ReactNode;
}


const Available: React.FC<AvailablePetsProps> = () => {
  const [query, setQuery] = useState('');
  const [available, setAvailable] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);
  const usePet = usePetService();

async function searchPets(availableChoice?: boolean) {
  let finalAvailable = available;

  if (availableChoice !== undefined) {
    finalAvailable = !availableChoice;
    setAvailable(finalAvailable);
  }


    const resultPets = await usePet.search(query, finalAvailable);
    setPets(resultPets);
  }

  function renderPetsCard(pet: Pet){
      return (
        <PetCard key={pet?.url} name={pet?.name} breed={pet?.breed} age={pet?.age} url={pet?.url}/> 
      );
  }

  function renderPets(){
    return pets.map(renderPetsCard);
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
              onClick={() => searchPets()}
              type="submit"
              className="px-5 py-3 rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 shadow-md transition"
            >
              Search
            </button>

            <button
              onClick={() => searchPets(available)}
              type="submit"
              className={`px-5 py-3 rounded-full font-semibold transition-all duration-200
                ${
                  available == true
                    ? 'bg-yellow-500 text-white ring-2 ring-yellow-700 shadow-sm'
                    : 'bg-gray-200 text-gray-500 shadow-lg'
                }
              `}
            >
              Available
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
