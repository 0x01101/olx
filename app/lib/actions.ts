"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { hash } from "bcrypt";
import { execQuery } from "@/app/lib/sql/sql";
import { Role } from "@/app/lib/definitions";

export async function logIn ( data: { email: string, password: string } ): Promise<{ success: boolean, message?: string }>
{
  try
  {
    await signIn( "credentials", {
      email:    data.email,
      password: data.password,
      redirect: false,
    } );
  }
  catch ( e: any )
  {
    if ( e instanceof AuthError )
    {
      switch ( e.type )
      {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials." };
        default:
          return { success: false, message: "An error occurred." };
      }
    }
  }
  return { success: true };
}

export async function signUp ( data: { email: string, password: string } ): Promise<{ success: boolean, message?: string }>
{
  try
  {
    const parsedCredentials = z
    .object( { email: z.string().email(), password: z.string().min( 6 ) } )
    .safeParse( data );
    
    if ( !parsedCredentials.success )
    {
      return { success: false, message: "Invalid credentials format" };
    }
    
    const hashedPassword: string = await hash( parsedCredentials.data.password, 10 );
    
    await execQuery<undefined>( `
        insert into
          users (email, password)
        values
          (?, ?);`,
      [ parsedCredentials.data.email, hashedPassword ],
    );
    
    await execQuery<undefined>( `
        insert into
          user_info (username, name, role)
        values
          (?, ?, ?);`,
      [ parsedCredentials.data.email, parsedCredentials.data.email.replace( /@.*$/img, "" ), Role.USER ],
    );
  }
  catch ( e: any )
  {
    return { success: false, message: "An error occurred." };
  }
  return { success: true };
}