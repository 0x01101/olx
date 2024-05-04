"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";
import { User, VerificationToken } from "@prisma/client";
import { ServerResponse } from "@/lib/definitions";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export async function newVerification ( token: string ): Promise<ServerResponse>
{
  const existingToken: VerificationToken | null = await getVerificationTokenByToken( token );
  
  if ( !existingToken )
    return { error: "Given token does not exist" };
  
  const hasExpired: boolean = new Date( existingToken.expires ) < new Date();
  
  if ( hasExpired )
    return { error: "Token has expired" };
  
  const existingUser: User | null = await getUserByEmail( existingToken.email );
  
  if ( !existingUser )
    return { error: "Email does not exist" };
  
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
  
  return { success: "Email verified" };
}