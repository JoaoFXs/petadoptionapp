export class User{
    photo?: Blob | string;
    username?: string;
    email?: string;
    password?: string;
}

export class Credentials{
    email?: string;
    password?: string;
}

export class AccessToken{
    accessToken?: string;
}

export class UserSessionToken{
    username?: string;
    url?: string;
    email?: string;
    role?: string;
    accessToken?: string;
    expiration?: number;
    photo?:  Blob;
}