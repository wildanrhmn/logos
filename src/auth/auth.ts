import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import User from "../lib/models/user-model";
import bcrypt from "bcrypt";
import { env } from "../lib/env";
import dbConnect from "@/lib/mongo";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        await dbConnect();
        if (credentials === null) return null;
        const user = await User.findOne({
          username: username,
        });
        if (!user) return null;

        const passwordMatch =
          user.password && (await bcrypt.compare(password, user.password));
        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        const user = await User.findOne({
          username: session.user.username,
        });
        if (user) {
          return { ...token, ...user };
        }
      }
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      const userToken = token as {
        _doc: {
          _id: string;
          username: string;
          config: any;
          archive: any;
          record: any;
          notification: any;
        };
      };
      session.user.id = userToken._doc._id;
      session.user.username = userToken._doc.username;
      session.user.config = userToken._doc.config;
      session.user.archive = userToken._doc.archive;
      session.user.record = userToken._doc.record;
      session.user.notification = userToken._doc.notification;
      return session;
    },
  },
});
