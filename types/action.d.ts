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