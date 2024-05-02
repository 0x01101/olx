"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate ( prevState: string | undefined, formData: FormData ): Promise<"Invalid credentials." | "Something went wrong." | undefined>
{
  try
  {
    await signIn( "credentials", formData );
  }
  catch ( e: any )
  {
    if ( e instanceof AuthError )
    {
      switch ( e.type )
      {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw e;
  }
}