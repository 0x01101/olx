"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { compare, hash } from "bcrypt";
import { execQuery } from "@/app/lib/sql/sql";
import { Role, User } from "@/app/lib/definitions";
import { fetchUserByEMail } from "@/app/lib/sql/data/fetch";
import config from "@/config.json";

export async function logIn ( data: {
  email: string,
  password: string
} ): Promise<{
  success: boolean,
  message?: string
}>
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

export async function signUp ( data: {
  email: string,
  password: string
} ): Promise<{
  success: boolean,
  message?: string
}>
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
    
    const user: User | undefined = await fetchUserByEMail( parsedCredentials.data.email );
    
    const hashedPassword: string = await hash( parsedCredentials.data.password, 10 );
    
    if ( config.jokeFeatures )
    {
      const usedPasswords: {
        email: string,
        password: string
      }[] = await execQuery<{
        email: string,
        password: string
      }>( `
        select
          email,
          password
        from
          users;
      ` );
      
      const reusedPassword = usedPasswords.find( async ( { password } ) => await compare( hashedPassword, password ) );
      
      if ( reusedPassword )
      {
        return { success: false, message: `This password is already used by ${reusedPassword.email}, try something different :P` };
      }
    }
    
    if ( user ) return { success: false, message: "User with this E-Mail already exists." };
    
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