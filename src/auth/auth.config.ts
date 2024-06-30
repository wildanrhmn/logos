import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      if (isLoggedIn && path.includes("/login")) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      if (
        !isLoggedIn &&
        (path.includes("/home") ||
          path.includes("/record") ||
          path.includes("/archive"))
      ) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
