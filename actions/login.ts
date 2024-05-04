"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

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