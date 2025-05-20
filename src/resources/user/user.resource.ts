export class User{
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
    email?: string;
    role?: string;
    accessToken?: string;
    expiration?: number;
}