'use client'

import { Template } from "@/components";
import { usePetService } from '@/resources/pet/pet.service';
import React, { useState, useEffect } from 'react';
import { Pet } from "@/resources";

export interface PetInfoProps {
  params: Promise<{
    petId: string;
  }>;
}

const PetInfo: React.FC<PetInfoProps> = ({ params }) => {
  const usePet = usePetService();
  const [petId, setPetId] = useState<string>('');
  const [pet, setPet] = useState<Pet | null>();
  const [loading, setLoading] = useState(true);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    residenceType: 'apartment',
    hasChildren: 'no',
    message: ''
  });

  // Captura petId
  useEffect(() => {
    const fetchParams = async () => {
      const resolved = await params;
      setPetId(resolved.petId);
    };
    fetchParams();
  }, [params]);

  // Busca informações do pet
  useEffect(() => {
    const fetchPet = async () => {
      if (petId) {
        try {
          setLoading(true);
          const result = await usePet.searchByID(petId.trim());
          setPet(result);
        } catch (error) {
          console.error("Erro ao buscar pet:", error);
          setPet(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPet();
  }, [petId]);

  // Componente para itens de informação
  const InfoItem = ({ label, value }: { label: string; value?: string | number }) => (
    <div className="mb-5">
      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-gray-800">
        {value || '-'}
      </dd>
    </div>
  );

  // Manipulador de mudança do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manipulador de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // lógica para enviar os dados
    console.log('Form data submitted:', formData);
    alert('Adoption request sent! We will contact you soon.');
    setShowAdoptionForm(false);
  };

  return (
    <Template>
      <div className="flex flex-col items-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : pet ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
            <div className="flex flex-col md:flex-row">
              {/* Container da imagem - proporção corrigida */}
              <div className="w-full md:w-2/5">
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-full flex items-center justify-center">
                  <div className="relative w-full aspect-square max-h-[500px] rounded-xl overflow-hidden shadow-lg border-4 border-white">
                    {pet.url ? (
                      <img 
                        src={pet.url} 
                        alt={pet.name} 
                        className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <svg className="h-20 w-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-400 text-sm">No photo available</span>
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
              {/* Container das informações */}
              <div className="w-full md:w-3/5 p-6 md:p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{pet.name}</h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                      {pet.breed}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                      {pet.size}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                      {pet.sex}
                    </span>
                  </div>
                </div>
                
                {/* Grid de informações */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <InfoItem label="Breed" value={pet.breed} />
                    <InfoItem label="Age" value={pet.age ? `${pet.age} years` : undefined} />
                  </div>
                  <div>
                    <InfoItem label="Weight" value={pet.weight ? `${pet.weight} kg` : undefined} />
                    <InfoItem label="Size" value={pet.size} />
                  </div>
                </div>
                
                {/* Descrição */}
                {pet.notes && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">About {pet.name}</h3>
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {pet.notes}
                    </p>
                  </div>
                )}
                
                {/* Formulário de Adoção */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Adoption Application</h3>
                  
                  {showAdoptionForm ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Your full name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            Pet Experience
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          >
                            <option value="">Select your experience</option>
                            <option value="none">No previous experience</option>
                            <option value="some">Some experience</option>
                            <option value="experienced">Experienced pet owner</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="residenceType" className="block text-sm font-medium text-gray-700 mb-1">
                            Type of Residence
                          </label>
                          <select
                            id="residenceType"
                            name="residenceType"
                            value={formData.residenceType}
                            onChange={handleChange}
                            className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          >
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Do you have children?
                          </label>
                          <div className="text-gray-500 flex space-x-4 mt-2">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="hasChildren"
                                value="yes"
                                checked={formData.hasChildren === 'yes'}
                                onChange={handleChange}
                                className="text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="hasChildren"
                                value="no"
                                checked={formData.hasChildren === 'no'}
                                onChange={handleChange}
                                className="text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2">No</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Why do you want to adopt {pet.name}?
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder="Tell us about yourself and why you'd be a great pet parent..."
                        />
                      </div>
                      
                      <div className="flex justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => setShowAdoptionForm(false)}
                          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:green-blue-600 hover:to-green-700 transition shadow-md hover:shadow-lg"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <button 
                        onClick={() => setShowAdoptionForm(true)}
                        className="w-full max-w-md mx-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        I want to adopt {pet.name}
                      </button>
                      <p className="mt-4 text-sm text-gray-500">
                        Complete our adoption form to start the process
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Pet not found</h3>
            <p className="mt-2 text-gray-500 max-w-md">
              The pet you are looking for was not found or does not exist.
            </p>
          </div>
        )}
      </div>
    </Template>
  );
};

export default PetInfo;