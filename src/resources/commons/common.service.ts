import { LocationsMap } from "./common.resource";

class CommonService{
    baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/common';

    async findAllLocations(): Promise<LocationsMap[]>{
        let url = `${this.baseURL}/location`;
        const response = await fetch(url); 
        return await response.json();
    }

    async findAllBreed(): Promise<[]>{
        let url = `${this.baseURL}/breed`;
        const response = await fetch(url); 
        return await response.json();
    }

    async findAllAges(): Promise<[]>{
        let url = `${this.baseURL}/age`;
        const response = await fetch(url); 
        return await response.json();
    }

    async findAllType(): Promise<[]>{
        let url = `${this.baseURL}/type`;
        const response = await fetch(url); 
        return await response.json();
    }

     async findAllSex(): Promise<[]>{
        let url = `${this.baseURL}/sex`;
        const response = await fetch(url); 
        return await response.json();
    }
    async findAllSize(): Promise<[]>{
        let url = `${this.baseURL}/size`;
        const response = await fetch(url); 
        return await response.json();
    }
}


export const useCommonService = () => new CommonService();

