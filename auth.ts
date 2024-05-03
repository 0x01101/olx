import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "@auth/core/providers/credentials";
import { compare } from "bcrypt";
import { User } from "@/app/lib/definitions";
import { fetchUserByEMail } from "@/app/lib/sql/data/fetch";

export const { auth, signIn, signOut } = NextAuth( {
  ...authConfig,
  providers: [
    CredentialsProvider( {
      async authorize ( credentials )
      {
        const { email, password }: { email: string, password: string } = credentials as { email: string, password: string };
        
        const user: User | undefined = await fetchUserByEMail( email );
        
        if ( !user ) return null;
        
        if ( await compare( password, user.password ) ) return {
          id:    user.id,
          email: user.email,
        };
        
        return null;
      },
    } ),
  ],
} );