import { LocationsMap } from "./common.resource";

class CommonService{
    baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/common/locations';

    async findAllLocations(): Promise<LocationsMap[]>{
        let url = `${this.baseURL}`;
        const response = await fetch(url); 
        return await response.json();
    }
}


export const useCommonService = () => new CommonService();

