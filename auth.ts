import NextAuth, { Session } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { JWT } from "@auth/core/jwt";
import { AdapterSession, AdapterUser } from "@auth/core/adapters";
import { getUserById } from "@/data/user";
import { TwoFactorConfirmation, User } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { UserUpdateSchema } from "@/schemas";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth( {
  pages:     {
    signIn: "/auth/login",
    error:  "/auth/error",
  },
  events:    {
    async linkAccount ( { user } )
    {
      await db.user.update( {
        where: { id: user.id },
        data:  { emailVerified: new Date() },
      } );
    },
  },
  callbacks: {
    async signIn ( { user, account } )
    {
      if ( account?.provider !== "credentials" ) return true;
      
      const existingUser: User | null = await getUserById( user.id as string );
      
      // Prevent sign in without verified email
      if ( !existingUser?.emailVerified ) return false;
      
      if ( existingUser.isTwoFactorEnabled )
      {
        const twoFactorConfirmation: TwoFactorConfirmation | null = await getTwoFactorConfirmationByUserId( existingUser.id );
        if ( !twoFactorConfirmation )
          return false;
        
        await db.twoFactorConfirmation.delete( { where: { id: twoFactorConfirmation.id } } );
      }
      
      return true;
    },
    async session ( { token, session }: { token: JWT, session: { user: AdapterUser } & AdapterSession & Session } )
    {
      if ( token.sub && session.user )
        session.user.id = token.sub;
      
      if ( token.role && session.user )
        session.user.role = token.role;
      
      if ( token.isTwoFactorEnabled && session.user )
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      
      return session;
    },
    async jwt (
      { token, trigger, session }:
        { token: JWT, trigger?: "signIn" | "update" | "signUp", session?: any },
    ): Promise<JWT>
    {
      if ( !token.sub )
        return token;
      
      const existingUser: User | null = await getUserById( token.sub );
      
      if ( !existingUser )
        return token;
      
      if ( trigger === "update" )
      {
        const { success, data } = UserUpdateSchema.safeParse( session );
        if ( success )
        {
          let validData = { image: data?.image !== undefined ? data?.image : null, ...data };
          await db.user.update( {
            where: { id: existingUser.id },
            data:  validData,
          } );
          
          token = { ...token, ...validData, picture: validData.image }; // WhY aRe ThErE tWo kEyS fOr ThE pRoFiLe PiCtUrE?
        }
      }
      
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.role = existingUser.role;
      
      return token;
    },
  },
  adapter:   PrismaAdapter( db ),
  session:   { strategy: "jwt" },
  ...authConfig,
} );