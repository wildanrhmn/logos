import NextAuth from 'next-auth';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      config: any;
      archive: any;
      record: any;
      notification: any;
      token: {
        accessToken: string;
        refreshToken: string;
      }
    } & DefaultSession["user"];
  }
}
