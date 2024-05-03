import config from "@/config.json";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages:     {
    signIn: "login",
  },
  session:   {
    strategy: "jwt",
  },
  callbacks: {
    authorized ( { auth, request: { nextUrl } } )
    {
      return !!auth?.user;
    },
  },
  secret:    config.authSecret,
  providers: [],
} satisfies NextAuthConfig;