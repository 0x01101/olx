import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export async function getVerificationTokenByToken ( token: string ): Promise<VerificationToken | null>
{
  try
  {
    return await db.verificationToken.findUnique( { where: { token } } );
  }
  catch ( e: any )
  {
    return null;
  }
}

export async function getVerificationTokenByEmail ( email: string ): Promise<VerificationToken | null>
{
  try
  {
    return await db.verificationToken.findFirst( { where: { email } } );
  }
  catch ( e: any )
  {
    return null;
  }
}