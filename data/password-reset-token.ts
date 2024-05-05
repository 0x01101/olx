import { PasswordResetToken } from "@prisma/client";
import { db } from "@/lib/db";

export async function getPasswordResetTokenByToken ( token: string ): Promise<PasswordResetToken | null>
{
  try
  {
    return await db.passwordResetToken.findUnique( {
      where: {
        token,
      },
    } );
  }
  catch ( e: any )
  {
    return null;
  }
}

export async function getPasswordResetTokenByEMail ( email: string ): Promise<PasswordResetToken | null>
{
  try
  {
    return await db.passwordResetToken.findFirst( {
      where: {
        email,
      },
    } );
  }
  catch ( e: any )
  {
    return null;
  }
}