import { motion } from 'framer-motion';


export class PetCardProps{
    url?: string;
    name?: string;
    breed?: string;
    age?: number;
}


export const PetCard: React.FC<PetCardProps> = ({url, name, breed, age}: PetCardProps) => {
    return (
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
                <h2 className="text-2xl font-bold text-green-700">{name}</h2>
                <p className="text-sm text-gray-500 mt-1">Breed: {breed}</p>
                <p className="text-sm text-gray-500">Age: {age}</p>
                <button className="mt-5 w-full bg-green-300 hover:bg-green-500 text-green-800 py-2 px-4 rounded-xl shadow-sm transition duration-300">
                  See more...
                </button>
              </div>
            </motion.div>
    );
}