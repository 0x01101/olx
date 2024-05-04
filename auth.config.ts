import Credentials from "@auth/core/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

export default {
  providers: [
    Credentials( {
      async authorize ( credentials )
      {
        const validatedFields = LoginSchema.safeParse( credentials );
        
        if ( validatedFields.success )
        {
          const { email, password }: { email: string, password: string } = validatedFields.data;
          
          const user: User | null = await getUserByEmail( email );
          if ( !user || !user.password ) return null;
          
          const passwordsMatch: boolean = await bcrypt.compare( password, user.password );
          
          if ( passwordsMatch ) return user;
        }
        
        return null;
      },
    } ),
  ],
} satisfies NextAuthConfig;