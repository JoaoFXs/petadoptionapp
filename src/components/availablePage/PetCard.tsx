import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaBirthdayCake, FaCat, FaDog, FaTimes} from 'react-icons/fa';

export class PetCardProps {
  url?: string;
  name?: string;
  breed?: string;
  age?: number;
}

export const PetCard: React.FC<PetCardProps> = ({ url, name, breed, age }: PetCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const openPetDetails = () => setShowDetails(prev => !prev);
  
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="bg-white shadow-md rounded-2xl overflow-hidden border border-green-100 hover:shadow-xl transition-all"
      >
        <div className="overflow-hidden">
          <img
            src={url}
            alt={name}
            className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <h2 className="text-2xl font-bold text-green-700">{name}<FaCat/></h2>
          <p className="text-sm text-gray-500 mt-1"> {breed}</p>
          <p className="text-sm text-gray-500">Age: {age}</p>
          <button
            onClick={openPetDetails}
            className="mt-5 w-full bg-gradient-to-r bg-green-400  hover:bg-green-500 text-white py-2 px-4 rounded-xl shadow-md transition duration-300 font-semibold"
          >
            See more...
          </button>
        </div>
      </motion.div>

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
                  src={url}
                  alt={name}
                  className="h-full w-full object-cover rounded-l-2xl md:rounded-none"
                />
              </div>

              {/* Conteúdo */}
              <div className="md:w-1/2 w-full p-6 flex flex-col justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-extrabold text-green-700 mb-2">{name}</h2>
                  <p className="flex items-center text-md text-gray-600 mb-2">
                    <FaDog className="mr-2 text-green-500" /> <span>Breed: {breed}</span>
                  </p>
                  <p className="flex items-center text-md text-gray-600 mb-4">
                    <FaBirthdayCake className="mr-2 text-pink-500" /> <span>Age: {age} year(s)</span>
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    <span className="font-medium">About:</span> This pet is affectionate, healthy and ready to find a new home. He loves to play, gets along well with children and other animals, and is up to date on all his vaccinations.
                  </p>
                </div>

                <button
                  onClick={openPetDetails}
                  className="mt-6 self-start bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition-all font-medium shadow-md"
                >
                  button temp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
