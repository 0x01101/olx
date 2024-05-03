import NextAuth, { NextAuthResult, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler: NextAuthResult = NextAuth( {
  providers: [
    CredentialsProvider( {
      credentials: {
        email:    {},
        password: {},
      },
      async authorize ( credentials, req )
      {
        console.log( credentials );
        return null;
      },
    } ),
  ],
} );

export { handler as GET, handler as POST };