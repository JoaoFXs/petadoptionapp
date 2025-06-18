'use client';
import { InputText, Template } from '@/components';
import React, { useState } from 'react';
import { usePetService } from '@/resources/pet/pet.service';
import { Button, PetCard } from '@/components';
import { Pet, LocationsMap } from '@/resources';
import { useCommonService } from '@/resources';
import { FaMapMarkerAlt, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
export interface AvailablePetsProps {
  children?: React.ReactNode;
}

const Available: React.FC<AvailablePetsProps> = () => {
  const [arrowIcon, setArrowIcon] = useState(true);
    const [arrowIcon2, setArrowIcon2] = useState(true);
  const [query, setQuery] = useState('');
  const [available, setAvailable] = useState<boolean | null>(null); // null = sem filtro
  const [pets, setPets] = useState<Pet[]>([]);
  const usePet = usePetService();
  const [locations, setLocations] = useState<LocationsMap[]>([]);
  const [availableDescription, setAvailableDescription] = useState<string[]>(["Available","Not Available"]);
  const [showFilters, setShowFilters] = useState(false);
  const useCommons = useCommonService();




  async function toggleLocations(){
    setArrowIcon(!arrowIcon);
    const data = await useCommons.findAllLocations();
    setLocations(data);
    console.log(locations)
  }
   function openFilters(){
    setShowFilters((prev) => !prev);
  }

  
  async function searchPets() {
    const resultPets = await usePet.search(query.trim(), available);
    setPets(resultPets);
  }

  function toggleAvailable() {
   setArrowIcon2(!arrowIcon2);
  }

  function renderPetsCard(pet: Pet) {
    return (
      <PetCard
            key={pet?.id}
            name={pet?.name}
            url={pet?.url}
            breed={pet?.breed}
            age={pet?.age}
            type={pet?.type}
            sex={pet?.sex}
            size={pet?.size}
            weight={pet?.weight}
            photo={pet?.photo}
            neutered={pet?.neutered}
            vaccinated={pet?.vaccinated}
            dewormed={pet?.dewormed}
            diseases={pet?.diseases}
            specialNeeds={pet?.specialNeeds}
            temperament={pet?.temperament}
            socialWith={pet?.socialWith}
            available={pet?.available}
            city={pet?.city}
            address={pet?.address}
            cep={pet?.address}
            province={pet?.province}
            adoptedByUser={pet?.adoptedByUser}
            adoptionDate={pet?.adoptionDate}
            history={pet?.history}
            microchip={pet?.microchip}
            notes={pet?.notes}
            tags={pet?.tags}
          />
    );
  }

  function renderPets() {
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
            className="text-gray-700 w-full sm:max-w-xl px-6 py-3 rounded-full border border-green-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />

          <div className="flex flex-col sm:flex-row gap-4 sm:ml-4">
            <button
              onClick={searchPets}
              type="submit"
              className="px-5 py-3 rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 shadow-md transition"
            >
              Search
            </button>
              <button onClick={openFilters} className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                  <FaMapMarkerAlt />
                  Filters
              </button>
                

                {/* Aqui começa o filtro*/}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row relative z-50"
                    >

                      {/* Botão de fechar dos filtros*/}
                      <button
                        className="absolute top-3 right-4 text-gray-600 hover:text-black"
                        onClick={openFilters}
                      >
                        <FaTimes />
                      </button>
                      {/* Localizações disponiveis */}
                      <div className="flex p-6 max-h-[80vh] overflow-y-auto w-full gap-2">
                
                        <button onClick={toggleLocations} className="flex flex-row items-center gap-">
                          {arrowIcon ? (
                            <FaChevronDown className="text-gray-800" />
                            
                            ):(
                               <FaChevronRight className="text-gray-800" />
                            )
                          }
                          
                          <h3 className="text-xl text-gray-800 font-semibold">Locations</h3>
                        </button>
                        {!arrowIcon &&(
                        <ul className=" space-y-2 text-gray-700 max-h-64 overflow-y-auto">
                          {locations.map((loc, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`loc-${index}`}
                                className="form-checkbox h-4 w-4 text-green-500"
                              />
                              <label htmlFor={`loc-${index}`} className="cursor-pointer">
                                {loc.city}
                              </label>
                            </li>
                          ))}
                        </ul>
                        )}
                      </div>

                    {/* Filtro Available */}
                      <div className="flex p-6 max-h-[80vh] overflow-y-auto w-full gap-2">
                
                        <button onClick={toggleAvailable} className="flex flex-row items-center gap-">
                          {arrowIcon2 ? (
                            <FaChevronDown className="text-gray-800" />
                            
                            ):(
                               <FaChevronRight className="text-gray-800" />
                            )
                          }
                          
                          <h3 className="text-xl text-gray-800 font-semibold">Available</h3>
                        </button>
                        {!arrowIcon2 &&(
                        <ul className=" space-y-2 text-gray-700 max-h-64 overflow-y-auto">
                          {availableDescription.map((loc, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`loc-${index}`}
                                className="form-checkbox h-4 w-4 text-green-500"
                              />
                              <label htmlFor={`loc-${index}`} className="cursor-pointer">
                                {loc}
                              </label>
                            </li>
                          ))}
                        </ul>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
        </div>

        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderPets()}
        </div>
      </section>
    </Template>
  );
};

export default Available;
