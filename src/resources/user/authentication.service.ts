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

    // Method to create a new user with given user data
    async save(user: User): Promise<void>{
        const response = await fetch(this.baseURL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),  
    
        });

        console.log("Response Auth.service: ", response);

        if(response.status == 401){
            const responseError = await response.json();
            throw new Error(responseError.error);
        }

    }

     // Initializes a session by decoding the token and storing session data
     initSession(token: AccessToken){
        if(token.accessToken){
            //Decode the token using jwt-decode library
            const decodedToken: any = jwt(token.accessToken);

            //Create a new UserSessionToken object using decoded token data
            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                role: decodedToken.role,
                username: decodedToken.name,
                expiration: decodedToken.exp
            };

            //Store the session token in localStorage
            this.setUserSession(userSessionToken);
        }
     }
    
    // Stores the user session in the browser's localStorage using a json in string format
    // This is used to persist the session across page reloads
    setUserSession(userSessionToken: UserSessionToken) {
        try{
            localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));

        }catch(error){}
        
    }
}


