import type { NextAuthConfig, Session } from "next-auth";
import { NextURL } from "next/dist/server/web/next-url";
import config from "@/config.json";

export const authConfig: NextAuthConfig = {
  pages:     {
    signIn: "/login",
  },
  callbacks: {
    authorized ( { auth, request: { nextUrl } }: { auth: Session | null, request: { nextUrl: NextURL } } ): boolean | Response
    {
      const isLoggedIn: boolean = !!auth?.user;
      const isOnAccountPage: RegExpMatchArray | null = nextUrl.pathname.match( /^\/((my)?account|adding)/img );
      
      if ( isOnAccountPage )
        return isLoggedIn;
      
      return true;
    },
  },
  providers: [],
  secret:    config.authSecret,
} satisfies NextAuthConfig;