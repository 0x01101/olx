import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth( {
  providers: [
    CredentialsProvider( {
      credentials: {
        email:    {},
        password: {},
      },
      async authorize ( credentials, req )
      {
        const user: User = { id: `${1}`, name: "J Smith", email: "jsmith@example.com" };
        
        if ( user )
        {
          return user;
        } else
        {
          return null;
        }
      },
    } ),
  ],
} );

export { handler as GET, handler as POST };