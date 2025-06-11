import { LocationsMap } from "./common.resource";

class CommonService{
    baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/common/';

    async findAllLocations(): Promise<LocationsMap[]>{
        const response = await fetch(`${this.baseURL}/locations`); 
        console.log(response)
        return await response.json();
    }
}


export const useCommonService = () => new CommonService();

