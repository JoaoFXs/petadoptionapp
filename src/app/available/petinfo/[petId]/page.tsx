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
  const [pet, setPet] = useState<Pet>();

  useEffect(() => {
    const fetchParams = async () => {
      const resolved = await params;
       console.log("Pet ID:", resolved.petId); // log útil
      setPetId(resolved.petId);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    const fetchPet = async () => {
      if (petId) {
        const result = await usePet.searchByID(petId.trim());
          console.log("Resultado da busca:", result); // Adicione aqui
    
        setPet(result); 
      }
    };

    fetchPet();
  }, [petId]);

  return (
    <Template>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-green-700">
          Pet Info: {pet?.name}
        </h1>
      </div>
    </Template>
  );
};

export default PetInfo;
