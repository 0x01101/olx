"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { hash } from "bcrypt";
import { db } from "@/lib/db";

export async function register ( values: z.infer<typeof RegisterSchema> ): Promise<{ success?: string, error?: string }>
{
  const validatedFields = RegisterSchema.safeParse( values );
  
  if ( !validatedFields.success )
    return { error: "Invalid fields" };
  
  const { email, password, name }: { email: string, password: string, name: string } = validatedFields.data;
  const hashedPassword: string = await hash( password, 10 );
  
  const existingUser = await db.user.findUnique( { where: { email } } );
  
  if ( existingUser )
    return { error: "Email already in use" };
  
  await db.user.create( { data: { email, password: hashedPassword, name } } );
  
  // TODO: Send verification email
  
  return { success: "User created" };
}