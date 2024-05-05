"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { User, VerificationToken } from "@prisma/client";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { messageProvider } from "@/lib/messages";

export async function login ( values: z.infer<typeof LoginSchema> ): Promise<{
  success?: string,
  error?: string
}>
{
  const validatedFields = LoginSchema.safeParse( values );
  
  if ( !validatedFields.success )
  {
    return { error: messageProvider.error.parseError };
  }
  
  const { email, password }: { email: string, password: string } = validatedFields.data;
  
  const existingUser: User | null = await getUserByEmail( email );
  
  if ( !existingUser || !existingUser.email || !existingUser.password )
    return { error: messageProvider.error.emailDoesntExist };
  
  if ( !existingUser.emailVerified )
  {
    const verificationToken: VerificationToken = await generateVerificationToken( existingUser.email );
    await sendVerificationEmail( verificationToken.email, verificationToken.token );
    return { success: messageProvider.success.confirmationEmailSent };
  }
  
  try
  {
    await signIn( "credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
          return { error: messageProvider.error.genericError };
      }
    
    throw e;
  }
  
  return { success: messageProvider.success.loggedIn };
}