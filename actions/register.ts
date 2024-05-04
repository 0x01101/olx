"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { compare, hash } from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { User } from "@prisma/client";

export async function register ( values: z.infer<typeof RegisterSchema> ): Promise<{ success?: string, error?: string }>
{
  const validatedFields = RegisterSchema.safeParse( values );
  
  if ( !validatedFields.success )
    return { error: "Invalid fields" };
  
  const { email, password, name }: { email: string, password: string, name: string } = validatedFields.data;
  const hashedPassword: string = await hash( password, 10 );
  
  if ( process.env.JOKE_FEATURES == "true" )
  {
    const users: User[] = await db.user.findMany();
    const reusedPassword: User | undefined = users.find( async ( { password }: {
      password: string | null
    } ): Promise<boolean | undefined> =>
    {
      if ( password )
        return await compare( hashedPassword, password );
    } );
    if ( reusedPassword && reusedPassword.email )
      return { error: `This password is already used by ${reusedPassword.email}, try something different` };
  }
  
  const existingUser: User | null = await getUserByEmail( email );
  
  if ( existingUser )
    return { error: "Email already in use" };
  
  await db.user.create( { data: { email, password: hashedPassword, name } } );
  
  // TODO: Send verification email
  
  return { success: "User created" };
}