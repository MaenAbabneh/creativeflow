interface SigninWithOauthParams {

    provider: github|google;
    providerAccountId: string;
    user: {
        name: string;
        email: string;
        image: string;
        username: string;
    };
}

interface AuthCredentials {
    email: string;
    name: string;
    username: string;
    password: string;
}