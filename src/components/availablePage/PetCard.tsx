import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md"; 
import {
  FaDog, FaCat, FaMars, FaVenus, FaBirthdayCake, FaSyringe, FaWeightHanging, FaNotesMedical,
  FaPaw, FaMapMarkerAlt, FaMicroscope, FaMicrochip, FaCheck, FaTimes
} from "react-icons/fa";
import { GiHighShot, GiSelfLove } from "react-icons/gi";
import { LuRuler } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { LocationsMap, useCommonService } from '@/resources';
export class PetCardProps {
  name?: string;
  url?: string;
  breed?: string;
  age?: number;
  type?: string;
  sex?: string;
  size?: string | undefined;
  weight?: number;
  photo?: Blob | string;
  neutered?: boolean;
  vaccinated?: boolean;
  dewormed?: boolean;
  diseases?: string;
  specialNeeds?: string;
  temperament?: string;
  socialWith?: string;
  available?: boolean;
  city?: string;
  province?: string;
  cep?: string;
  address?: string;
  adoptedByUser?: string;
  adoptionDate?: string;
  history?: string;
  microchip?: boolean;
  notes?: string;
  tags?: string;
}

export const PetCard: React.FC<PetCardProps> = (pet: PetCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const openPetDetails = () => setShowDetails(prev => !prev);


  function capitalizeFirstLetter(text: string) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  function setDewormed(isDewormed: boolean){
    return isDewormed == true ? <AiOutlineCheckCircle className="mr-2 text-green-600"/> : <MdCancel  className="mr-2 text-red-600"/>
  }
 
  function defineCatOrDog(){
    return pet.type?.match("CAT") ? <FaCat/> : <FaDog/>;
  }

  function defineMaleorFemale(){
    return pet.sex == "MALE" ? <FaMars className=' text-blue-300 '/> : <FaVenus className='text-pink-300'/>;
 
  }
  const booleanIcon = (val: boolean) => (
  val ? <FaCheck className="text-green-500 mr-1" /> : <FaTimes className="text-red-500 mr-1" />
);

  return (
    <>
     <button onClick={openPetDetails} className=" shadow-md transition duration-300 font-semibold">
      
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="bg-white shadow-md rounded-2xl overflow-hidden border border-green-100 hover:shadow-xl transition-all"
        >
          
          <div className="overflow-hidden">
             
            <img
              src={pet.url}
              alt={pet.name}
              className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col items-start p-5">
            <div className="flex flex-row items-center justify-between w-full">
              <h2 className="flex items-center gap-1 text-2xl font-bold text-green-700">
                {pet.name}
                {defineMaleorFemale()}
              </h2>
              
              <MdPets className={pet.available ? "text-green-600" : "text-red-600"}   title={pet.available ? "Available for adoption" : "Not Available for adoption"} />
            </div>
            <p className="text-green-700">{defineCatOrDog()}</p>
            <p className="text-sm text-gray-500 mt-1"> {pet.breed}</p>
            <p className="flex flex-row items-center gap-2 text-sm text-gray-500"><FaBirthdayCake/> {pet.age} year(s)</p>
         
          </div>
        </motion.div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row relative"
            >
              {/* Botão fechar */}
              <button
                onClick={openPetDetails}
                className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl z-10"
              >
                <FaTimes />
              </button>

              {/* Imagem */}
              <div className="md:w-1/2 w-full">
                <img
                  src={pet.url}
                  alt={pet.name}
                  className="h-full w-full object-cover rounded-l-2xl md:rounded-none"
                />
              </div>

              {/* Conteúdo */}
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-between gap-4">
                    <div>
                      <h2 className="flex items-center gap-2 justify-center text-3xl font-extrabold text-green-700 mb-3">
                        {pet.name} {defineMaleorFemale()}
                      </h2>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700 text-md">
                        <p className="flex items-center"><FaDog className="text-green-500 mr-2" /> {pet.breed}</p>
                        <p className="flex items-center"><LuRuler className="text-green-500 mr-2" /> {pet.size}</p>
                        <p className="flex items-center"><FaWeightHanging className="text-blue-500 mr-2" /> {pet.weight} kg</p>
                        <p className="flex items-center"><FaBirthdayCake className="text-pink-500 mr-2" /> {pet.age} year(s)</p>
                        <p className="flex items-center">{booleanIcon(!!pet.vaccinated)} Vaccinated</p>
                        <p className="flex items-center">{booleanIcon(!!pet.dewormed)} Dewormed</p>
                        <p className="flex items-center">{booleanIcon(!!pet.neutered)} Neutered</p>
                        <p className="flex items-center"><FaPaw className="text-purple-600 mr-2" /> {pet.temperament}</p>
                        {pet.diseases && <p className="flex items-center"><FaNotesMedical className="text-red-400 mr-2" /> {pet.diseases}</p>}
                        {pet.specialNeeds && <p className="flex items-center"><GiSelfLove className="text-rose-400 mr-2" /> {pet.specialNeeds}</p>}
                        {pet.microchip && <p className="flex items-center"><FaMicrochip className="text-gray-500 mr-2" /> Microchipped #{pet.microchip}</p>}
                        <p className="flex items-center"><FaMapMarkerAlt className="text-orange-500 mr-2" /> {pet.city},{pet.province}</p>
                      </div>

                      {pet.notes && (
                        <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                          <span className="font-medium">📝 {pet.notes}</span>
                        </p>
                      )}
                    </div>

                    <button
                      className="mt-6 self-stretch bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition-all font-medium shadow-md"
                    >
                      Adopt this Pet
                    </button>
                  </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
