import { Pet } from './pet.resource'
import { useAuth } from '@/resources'


class PetService{
    baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/pet';
    auth = useAuth();

    async search(query: string = "", available: boolean = true) : Promise<Pet[]>{
        const url = `${this.baseURL}?available=${available.toString()}&query=${query}`
        const response = await fetch(url);
        return await response.json();
    }

}

export const usePetService = () => new PetService(); 