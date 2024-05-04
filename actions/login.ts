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

export async function login ( values: z.infer<typeof LoginSchema> ): Promise<{
  success?: string,
  error?: string
}>
{
  const validatedFields = LoginSchema.safeParse( values );
  
  if ( !validatedFields.success )
  {
    return { error: "Invalid fields" };
  }
  
  const { email, password }: { email: string, password: string } = validatedFields.data;
  
  const existingUser: User | null = await getUserByEmail( email );
  
  if ( !existingUser || !existingUser.email || !existingUser.password )
    return { error: "Email does not exist" };
  
  if ( !existingUser.emailVerified )
  {
    const verificationToken: VerificationToken = await generateVerificationToken( existingUser.email );
    await sendVerificationEmail( verificationToken.email, verificationToken.token );
    return { success: "Confirmation email sent" };
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
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    
    throw e;
  }
  
  return { success: "Logged in" };
}