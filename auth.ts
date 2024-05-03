import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";

export const { auth, signIn, signOut } = NextAuth( {
  ...authConfig,
  providers: [
    Credentials( {
      async authorize ( credentials )
      {
        console.log( credentials );
        return null;
      },
    } ),
  ],
} );