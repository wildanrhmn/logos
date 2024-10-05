import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //You can add custom authorization logic here
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
