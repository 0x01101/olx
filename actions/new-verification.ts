"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";
import { User, VerificationToken } from "@prisma/client";
import { ServerResponse } from "@/lib/definitions";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { messageProvider } from "@/lib/messages";

export async function newVerification ( token: string ): Promise<ServerResponse>
{
  const existingToken: VerificationToken | null = await getVerificationTokenByToken( token );
  
  if ( !existingToken )
    return { error: messageProvider.invalidToken };
  
  const hasExpired: boolean = new Date( existingToken.expires ) < new Date();
  
  if ( hasExpired )
    return { error: messageProvider.expiredToken };
  
  const existingUser: User | null = await getUserByEmail( existingToken.email );
  
  if ( !existingUser )
    return { error: messageProvider.emailDoesntExist };
  
  await db.user.update( {
    where: { id: existingUser.id },
    data:  {
      emailVerified: new Date(),
      email:         existingToken.email,
    },
  } );
  
  await db.verificationToken.delete( {
    where: { id: existingToken.id },
  } );
  
  return { success: messageProvider.emailVerified };
}