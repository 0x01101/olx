"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { TwoFactorConfirmation, TwoFactorToken, User, VerificationToken } from "@prisma/client";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { messageProvider } from "@/lib/messages";
import { ServerResponse } from "@/lib/definitions";
import { getTwoFactorTokenByEMail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { UpdateSession } from "next-auth/react";

export async function login (
  values: z.infer<typeof LoginSchema>,
  redirectTo?: string | null,
): Promise<ServerResponse & { twoFactor?: boolean }>
{
  const validatedFields = LoginSchema.safeParse( values );
  
  if ( !validatedFields.success )
  {
    return { error: messageProvider.error.parseError };
  }
  
  const { email, password, code }: { email: string, password: string, code?: string } = validatedFields.data;
  
  const existingUser: User | null = await getUserByEmail( email );
  
  if ( !existingUser || !existingUser.email || !existingUser.password )
    return { error: messageProvider.error.emailDoesntExist };
  
  if ( !existingUser.emailVerified )
  {
    const verificationToken: VerificationToken = await generateVerificationToken( existingUser.email );
    await sendVerificationEmail( verificationToken.email, verificationToken.token );
    return { success: messageProvider.success.confirmationEmailSent };
  }
  
  if ( existingUser.isTwoFactorEnabled && existingUser.email )
  {
    if ( code )
    {
      const twoFactorToken: TwoFactorToken | null = await getTwoFactorTokenByEMail( existingUser.email );
      
      if ( !twoFactorToken )
        return { error: messageProvider.error.invalid2FAToken };
      
      if ( twoFactorToken.token !== code )
        return { error: messageProvider.error.invalid2FAToken };
      
      const hasExpired: boolean = new Date( twoFactorToken.expires ) < new Date();
      
      if ( hasExpired )
        return { error: messageProvider.error.TwoFactorCodeExpired };
      
      await db.twoFactorToken.delete( { where: { id: twoFactorToken.id } } );
      
      const existingConfirmation: TwoFactorConfirmation | null = await getTwoFactorConfirmationByUserId( existingUser.id );
      
      if ( existingConfirmation )
        await db.twoFactorConfirmation.delete( { where: { id: existingConfirmation.id } } );
      
      await db.twoFactorConfirmation.create( { data: { userId: existingUser.id } } );
    } else
    {
      const twoFactorToken: TwoFactorToken = await generateTwoFactorToken( existingUser.email );
      await sendTwoFactorTokenEmail( twoFactorToken.email, twoFactorToken.token );
      
      return { twoFactor: true };
    }
  }
  
  try
  {
    await signIn( "credentials", {
      email,
      password,
      redirectTo: redirectTo || DEFAULT_LOGIN_REDIRECT,
    } );
  }
  catch ( e: any )
  {
    if ( e instanceof AuthError )
      switch ( e.type )
      {
        case "CredentialsSignin":
          return { error: messageProvider.error.invalidCredentials };
        default:
          return { error: messageProvider.error.generic };
      }
    
    throw e;
  }
  
  return { success: messageProvider.success.loggedIn };
}