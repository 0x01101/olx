import type { NextAuthConfig, Session } from "next-auth";
import { NextURL } from "next/dist/server/web/next-url";

export const authConfig: NextAuthConfig = {
  pages:     {
    signIn: "/login",
  },
  callbacks: {
    authorized ( { auth, request: { nextUrl } }: { auth: Session | null, request: { nextUrl: NextURL } } ): boolean
    {
      const isLoggedIn: boolean = !!auth?.user;
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;