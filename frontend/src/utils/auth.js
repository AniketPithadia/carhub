import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./db";
import { User } from "./models";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
// import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        connectToDb();
        try {
          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            const generatedPassword = Math.random().toString(36).substring(7);
            const newUser = new User({
              username: profile.name,
              email: profile.email,
              password: generatedPassword,
              image: profile.avatar_url,
            });

            await newUser.save();

            user.userId = newUser._id;
          } else {
            user.userId = existingUser._id;
          }
          return { ...user, userId: user.userId };
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },

    // ...authConfig.callbacks,
  },
  async jwt({ token, user, session }) {
    console.log("jwt", token, user, session);
    return true;
  },
  // async session(session, user) {
  //   // Fetch the user from the database based on the session user object
  //   const currentUser = await User.findOne({ email: user.email });

  //   // Add the userId to the session object
  //   session.userId = currentUser._id;

  //   return session;
  // },
});
