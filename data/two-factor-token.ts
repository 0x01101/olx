import { TwoFactorToken } from "@prisma/client";
import { db } from "@/lib/db";

export async function getTwoFactorTokenByToken ( token: string ): Promise<TwoFactorToken | null>
{
  try
  {
    return await db.twoFactorToken.findUnique( { where: { token } } );
  }
  catch ( e: any )
  {
    return null;
  }
}

export async function getTwoFactorTokenByEMail ( email: string ): Promise<TwoFactorToken | null>
{
  try
  {
    return await db.twoFactorToken.findFirst( { where: { email } } );
  }
  catch ( e: any )
  {
    return null;
  }
}