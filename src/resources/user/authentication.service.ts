import { decode } from 'punycode';
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
    async save(user: FormData): Promise<string>{
        const response = await fetch(this.baseURL,{
            method: 'POST',
            body: user,  
    
        });

        console.log("Response Auth.service: ", response);

        if(response.status == 401 || response.status == 409){
            const responseError = await response.json();
            throw new Error(responseError.error);
        }

        return response.headers.get('location') ?? ''

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
                photo: decodedToken.photo,
                username: decodedToken.name,  
                url: decodedToken.url,    
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

    //Retrieves the use session from localStorage
    getUserSession(): UserSessionToken | null{
        try{
            const authString = localStorage.getItem(AuthService.AUTH_PARAM);
            //If there's no session saved, return null
            if(!authString){
                return null;
            }
            //Parse the session JSON string back into a UserSessionToken object
            const token: UserSessionToken = JSON.parse(authString);
            return token;
        }catch(error){
            return null;
        }
    }

// Checks if the current session is still valid based on expiration time
isSessionValid(): boolean {
    // Retrieve the user session from localStorage
    const userSession: UserSessionToken | null = this.getUserSession();
   
    // If there is no session, it's not valid
    if (!userSession) {
        return false;
    }

    // Get the expiration timestamp from the session
    const expiration: number | undefined = userSession.expiration;

    if (expiration) {
        // Convert the expiration time from seconds to milliseconds
        const expirationDataInMillis = expiration * 1000;

        // Compare expiration with the current time
        return new Date() < new Date(expirationDataInMillis);
    }

    // If expiration is not defined, the session is invalid
    return false;
}

    invalidateSession(): void{
        try{
            // Remove the session from localStorage
            localStorage.removeItem(AuthService.AUTH_PARAM);
        }
        catch(error){}
    }
}

// Exporting a custom hook to create a new AuthService instance
export const useAuth = () => new AuthService();





