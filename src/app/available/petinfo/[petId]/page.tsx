'use client'

import { Template } from "@/components";
import { use } from "react";
export interface PetInfoProps{
   params: Promise<{
    petId: string;
  }>;
}


const PetInfo: React.FC<PetInfoProps> = ({ params }: PetInfoProps) => {
  const { petId } = use(params);
    return(
        <Template>
          <div className="p-6">
        <h1 className="text-3xl font-bold text-green-700">Pet Info: {petId}</h1>
      </div>
        </Template>

    )

};

export default PetInfo;