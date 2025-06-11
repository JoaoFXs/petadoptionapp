import { Pet } from './pet.resource'
import { useAuth } from '@/resources'


class PetService{
    baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/pet';

async search(query: string = "", available?: boolean | null ): Promise<Pet[]> {
  let url = `${this.baseURL}?`;

  const params: string[] = [];

  if (query.trim() !== "") {
    params.push(`query=${encodeURIComponent(query)}`);
  }

  if (available !== null && available !== undefined) {
    params.push(`available=${available.toString()}`);
  }

  // Junta os parâmetros, se houver
  url += params.join("&");

  const response = await fetch(url);
  return await response.json();
}

}

export const usePetService = () => new PetService(); 