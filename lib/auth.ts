import User from "@/models/users.model";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import mongoClient from "./mongo-client";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  adapter: MongoDBAdapter(mongoClient),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
        },
        password: {},
        name: {},
      },

      authorize: async (credentials) => {
        if (credentials === null) {
          return null;
        }
        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("Could not find user");
          }

          // if (user.password !== credentials.password) {
          //   throw new Error("Password does not match");
          // }
          // console.log(user);

          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  //   database: process.env.DATABASE_URL,
  //   secret: process.env.SECRET,
  //   session: {
  //     jwt: true,
  //   },
  //   jwt: {
  //     secret: process.env.JWT_SECRET,
  //   },
  //   pages: {
  //     signIn: "/auth/signin",
  //   },
  //   callbacks: {
  //     async jwt(token, user, account, profile, isNewUser) {
  //       if (account?.accessToken) {
  //         token.accessToken = account.accessToken;
  //       }
  //       return token;
  //     },
  //     async session(session, token) {
  //       session.accessToken = token.accessToken;
  //       return session;
  //     },
  //   },
  //   events: {
  //     async signIn(message) {
  //       console.log("Sign in event", message);
  //     },
  //   },
  //   debug: true,
});
