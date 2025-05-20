export class User{
    username?: string;
    email?: string;
    password?: string;
}

export class Credentials{
    email?: string;
    password?: string;
}

export class AcessToken{
    accessToken?: string;
}

export class UserSessionToken{
    username?: string;
    email?: string;
    accessToken?: string;
    expiration?: string;
}