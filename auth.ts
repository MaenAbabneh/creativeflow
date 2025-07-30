import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "./lib/api";
import { ActionResponse } from "./types/global";
import { IAccountDoc } from "./database/account.model";
import { SignInSchema } from "./lib/validatoin";
import Credentials from "next-auth/providers/credentials";
import { IUserDoc } from "./database/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const { data: existingAccount } = (await api.account.getByProvider(
            email
          )) as ActionResponse<IAccountDoc>;
          if (!existingAccount) return null;
          const { data: existingUser } = (await api.users.getById(
            existingAccount.userId.toString()
          )) as ActionResponse<IUserDoc>;
          if (!existingUser) return null;

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password!
          );
          if (isValidPassword) {
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
            };
          }
        }
        return null;
        // divided problem into smaller parts:
        // 1. Validate the credentials using SignInSchema
        // 2. Fetch the account by email
        // 3. If account exists, fetch the user by userId
        // 4. Compare the password with the hashed password in the account
        // 5. If valid, return the user object
        // 6. If not valid, return null
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },

    // divided (async session) problem into smaller part or in antor word what (async session) actually does is:
    // 1. It receives the session and token objects.
    // 2. It assigns the user ID from the token to the session.user.id.
    // 3. It returns the modified session object.
    // 4. This allows the session to include the user ID, which can be used in the application.
    // 5. This is useful for identifying the user in subsequent requests.

    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          (await api.account.getByProvider(
            account.type === "credentials"
              ? token.email!
              : account.providerAccountId
          )) as ActionResponse<IAccountDoc>;

        if (!success || !existingAccount) return token;

        const userId = existingAccount.userId;

        if (userId) token.sub = userId.toString();
      }
      return token;
    },
    // divided (async jwt) problem into smaller part or in antor word what (async jwt) actually does is:
    // 1. It receives the token and account objects.
    // 2. If an account exists, it fetches the existing account by provider.
    // 3. If the account is found, it retrieves the user ID from the account.
    // 4. It assigns the user ID to the token.sub property.
    // 5. Finally, it returns the modified token object.
    // 6. This allows the token to include the user ID, which can be used in subsequent requests.

    async signIn({ user, profile, account }) {
      if (account?.provider === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "github"
            ? (profile?.login as string)
            : (user.name?.toLowerCase() as string),
      };

      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as "github" | "google",
        providerAccountId: account.providerAccountId,
      })) as ActionResponse;

      if (!success) return false;

      return true;
    },
    // divided (async signIn) problem into smaller part or in antor word what (async signIn) actually does is:
    // 1. It receives the user, profile, and account objects.
    // 2. If the account provider is "credentials", it returns true to allow sign
    // 3. If the account or user is not present, it returns false to deny sign in.
    // 4. It constructs a userInfo object with the user's name, email, image, and username.
    // 5. It calls the api.auth.oAuthSignIn function with the userInfo, provider, and providerAccountId.
    // 6. If the sign-in is successful, it returns true; otherwise, it
    // returns false to deny sign in.
  },
});

// This code sets up NextAuth with GitHub and Google as authentication providers.
// It also includes a custom credentials provider for email and password authentication.
// The authorize function validates the credentials using a schema and checks the user's account and password.
// The session and JWT callbacks are used to manage user sessions and tokens.
// The signIn callback handles OAuth sign-ins by creating or updating user accounts based on the provider.
// The code also imports necessary modules and types for handling authentication and user data.
