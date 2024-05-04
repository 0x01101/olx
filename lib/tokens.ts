import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { VerificationToken } from "@prisma/client";
import { db } from "@/lib/db";

export async function generateVerificationToken ( email: string ): Promise<VerificationToken>
{
  const token: string = uuidv4();
  const expires: Date = new Date( new Date().getTime() + 3600 * 1000 );
  
  const existingToken: VerificationToken | null = await getVerificationTokenByEmail( email );
  
  if ( existingToken )
    await db.verificationToken.delete( { where: { id: existingToken.id } } );

  return db.verificationToken.create( {
    data: {
      email,
      token,
      expires,
    },
  } );
}