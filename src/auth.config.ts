import { env } from "@/lib/env";
import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/",
  },
} satisfies NextAuthConfig;
