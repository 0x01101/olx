import NextAuth, { Session } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { JWT } from "@auth/core/jwt";
import { AdapterSession, AdapterUser } from "@auth/core/adapters";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth( {
  callbacks: {
    async session ( { token, session }: { token: JWT, session: { user: AdapterUser } & AdapterSession & Session } )
    {
      if (token.sub && session.user)
        session.user.id = token.sub;
      
      return session;
    },
    async jwt ( { token }: { token: JWT } ): Promise<JWT>
    {
      return token;
    },
  },
  adapter:   PrismaAdapter( db ),
  session:   { strategy: "jwt" },
  ...authConfig,
} );