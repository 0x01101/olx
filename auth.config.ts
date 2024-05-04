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
      const isLoggedIn: boolean = !!auth?.user;
      const isOnProtectedPage: boolean = !!nextUrl.pathname.match( /^\/(my)?account/ );
      
      if ( isOnProtectedPage )
      {
        return isLoggedIn;
      }
      
      return true;
    },
  },
  secret:    config.authSecret,
  providers: [],
} satisfies NextAuthConfig;