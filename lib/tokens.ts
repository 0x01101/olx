import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { PasswordResetToken, TwoFactorToken, VerificationToken } from "@prisma/client";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEMail } from "@/data/password-reset-token";
import crypto from "crypto";
import { getTwoFactorTokenByEMail } from "@/data/two-factor-token";

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

export async function generatePasswordResetToken ( email: string ): Promise<PasswordResetToken>
{
  const token: string = uuidv4();
  const expires: Date = new Date( new Date().getTime() + 3600 * 1000 );
  
  const existingToken: PasswordResetToken | null = await getPasswordResetTokenByEMail( email );
  
  if ( existingToken )
    await db.passwordResetToken.delete( { where: { id: existingToken.id } } );
  
  return db.passwordResetToken.create( {
    data: {
      email,
      token,
      expires,
    },
  } );
}

export async function generateTwoFactorToken ( email: string ): Promise<TwoFactorToken>
{
  const token: string = crypto.randomInt( 100_000, 1_000_000 ).toString();
  const expires: Date = new Date( new Date().getTime() + 60 * 15 * 1000 );
  const existingToken: TwoFactorToken | null = await getTwoFactorTokenByEMail( email );
  if ( existingToken )
    await db.twoFactorToken.delete( { where: { id: existingToken.id } } );
  return db.twoFactorToken.create( {
    data: { email, token, expires },
  } );
}