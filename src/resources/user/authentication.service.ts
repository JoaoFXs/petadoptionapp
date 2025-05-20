import { AccessToken, Credentials, User, UserSessionToken } from './user.resource';
import jwt from 'jwt-decode';




class AuthService{


    baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/users';
    // Static variable used to store the session token in the browser's localStorage
    static AUTH_PARAM: string = '_auth';
    
    // Method to authenticate a user with given credentials (email and password)
    async authenticate(credentials: Credentials): Promise<AccessToken>{
        console.log(credentials);
        const response = await fetch(this.baseURL + '/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),  
        });
        if (response.status == 401) {
            throw new Error('User or Password are incorrect or not registered');
        }
        return await response.json();
    }


