'use client';
import { FilterItems, InputText, Template } from '@/components';
import React, { useState } from 'react';
import { usePetService } from '@/resources/pet/pet.service';
import { Button, PetCard,  } from '@/components';
import { Pet, LocationsMap } from '@/resources';
import { useCommonService } from '@/resources';
import { FaMapMarkerAlt, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
export interface AvailablePetsProps {
  children?: React.ReactNode;
}

const Available: React.FC<AvailablePetsProps> = () => {
    const [toggles, setToggles] = useState({
      locations: true,
      available: true,
      breed: true,
      age: true,
      type: true,
      sex: true,
      size: true,
      temperament: true
    });

  const [query, setQuery] = useState('');
  const [available, setAvailable] = useState<boolean | null>(null); // null = sem filtro
  const [pets, setPets] = useState<Pet[]>([]);
  const usePet = usePetService();
  const [locations, setLocations] = useState<LocationsMap[]>([]);
  const [breed, setBreed] = useState<string[]>([]);
  const [age, setAge] = useState<string[]>([]);
    const [temperament, setTemperament] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
    const [sex, setSex] = useState<string[]>([]);
  const [availableDescription, setAvailableDescription] = useState<string[]>(["Available","Not Available"]);
  const [showFilters, setShowFilters] = useState(false);
  const useCommons = useCommonService();
const [filters, setFilters] = useState<{
  city: string[],
  available: string[],
  breed: string[],
  age: string[],
  type: string[],
  sex: string[],
  size: string[],
  temperament: string[]
}>({
  city: [],
  available: [],
  breed: [],
  age: [],
  type: [],
  sex: [],
  size: [],
  temperament: []
});

function onSelectionChange(key: keyof typeof filters, valueCSV: string) {
   
  const values = valueCSV.split(',').map(v => v.trim()).filter(Boolean);
  setFilters(prev => ({
    ...prev,
    [key]: values
  }));

}
async function searchPetsByInput() {
    const resultPets = await usePet.search(query.trim(), available);
    setPets(resultPets);
  }

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  async function toggleFilters(filterfield: string){

  }

  async function toggleLocations(){
     toggle('locations'); // alterna o estado

    const data = await useCommons.findAllLocations();
    setLocations(data);
  }

    async function toggleBreed(){
     toggle('breed'); // alterna o estado
      const data = await useCommons.findQueryValues("breed");
     setBreed(data);
    }

    async function toggleSize(){
     toggle('size'); // alterna o estado

      const data = await useCommons.findQueryValues("size");
     setSize(data);
    }

    async function toggleTemperament(){
     toggle('temperament'); // alterna o estado

      const data = await useCommons.findQueryValues("temperament");
     setTemperament(data);
    }
    async function toggleType(){
     toggle('type'); // alterna o estado

      const data = await useCommons.findQueryValues("type");
     setType(data);
    }
    async function toggleAge(){
     toggle('age'); // alterna o estado

      const data = await useCommons.findQueryValues("age");
     setAge(data);
    }

    async function toggleSex(){
     toggle('sex'); // alterna o estado

      const data = await useCommons.findQueryValues("sex");
     setSex(data);
    }
   function openFilters(){
    setShowFilters((prev) => !prev);
  }

  
async function searchPets() {
  // junta todos os filtros em uma única string separada por vírgula
  const allValues = Object.values(filters).flat().join(',');
  console.log(">>", allValues);
  const resultPets = await usePet.search(allValues.trim(), available);
  setPets(resultPets);
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
              onClick={searchPetsByInput}
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
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col flex-wrap md:flex-row relative z-50"
                    >

                      {/* Botão de fechar dos filtros*/}
                      <button
                        className="absolute top-3 right-4 text-gray-600 hover:text-black"
                        onClick={openFilters}
                      >
                        <FaTimes />
                      </button>

                    <FilterItems 
                        arrowIcon={toggles.locations} 
                        itemLabelKey="city" 
                        listItems={locations} 
                        onClick={toggleLocations} 
                        labelText='Locations' 
                        onSelectionChange={(csv) => onSelectionChange("city", csv)} 
                      />

     

                      <FilterItems labelText='Breed' listItems={breed} arrowIcon={toggles.breed} onClick={toggleBreed} onSelectionChange={(csv) => onSelectionChange("breed", csv)} />
                      <FilterItems labelText='Age' listItems={age} arrowIcon={toggles.age} onClick={toggleAge} onSelectionChange={(csv) => onSelectionChange("age", csv)} />
                      <FilterItems labelText='Type' listItems={type} arrowIcon={toggles.type} onClick={toggleType} onSelectionChange={(csv) => onSelectionChange("type", csv)} />
                      <FilterItems labelText='Sex' listItems={sex} arrowIcon={toggles.sex} onClick={toggleSex} onSelectionChange={(csv) => onSelectionChange("sex", csv)} />
                      <FilterItems labelText='Size' listItems={size} arrowIcon={toggles.size} onClick={toggleSize} onSelectionChange={(csv) => onSelectionChange("size", csv)} />
                      <FilterItems labelText='Temperament' listItems={temperament} arrowIcon={toggles.temperament} onClick={toggleTemperament} onSelectionChange={(csv) => onSelectionChange("temperament", csv)} />

                    <button
                      onClick={searchPets}
                      type="submit"
                      className="absolute bottom-4 right-4 px-5 py-2 border border-gray-800 text-gray-800 rounded-md font-semibold hover:bg-gray-100 transition"
                    >
                      Search
                    </button>
                   
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
