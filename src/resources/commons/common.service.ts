import { LocationsMap } from "./common.resource";

class CommonService{
    baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/common';



    async findQueryValues(path: string): Promise<[]>{
        let url = `${this.baseURL}/${path}`;
        const response = await fetch(url);
        return await response.json();
    }
    async findAllLocations(): Promise<LocationsMap[]>{
        let url = `${this.baseURL}/location`;
        const response = await fetch(url); 
        return await response.json();
    }
    
}


export const useCommonService = () => new CommonService();

