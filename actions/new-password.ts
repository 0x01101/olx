"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { ServerResponse } from "@/lib/definitions";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { PasswordResetToken, User } from "@prisma/client";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function newPassword ( values: z.infer<typeof NewPasswordSchema>, token?: string | null ): Promise<ServerResponse>
{
  if ( !token )
    return { error: "Missing token" };
  
  const validatedFields = NewPasswordSchema.safeParse( values );
  
  if ( !validatedFields.success )
    return { error: "Invalid fields" };
  
  const { password }: z.infer<typeof NewPasswordSchema> = validatedFields.data;
  
  const existingToken: PasswordResetToken | null = await getPasswordResetTokenByToken( token );
  
  if ( !existingToken )
    return { error: "Invalid token" };
  
  const hasExpired: boolean = new Date( existingToken.expires ) < new Date();
  
  if ( hasExpired )
    return { error: "Token has expired" };
  
  const existingUser: User | null = await getUserByEmail( existingToken.email );
  
  if ( !existingUser )
    return { error: "Email does not exist" };
  
  if ( !existingUser.password )
    return { error: "This user does not use credentials" };
  
  const usingTheSamePassword: boolean = await bcrypt.compare( password, existingUser.password );
  
  if ( usingTheSamePassword )
    return { error: "Cannot use the same password" };
  
  const hashedPassword: string = await bcrypt.hash( password, 10 );
  
  await db.user.update( {
    where: { id: existingUser.id },
    data:  {
      password: hashedPassword,
    },
  } );
  
  await db.passwordResetToken.delete( { where: { id: existingToken.id } } );
  
  return { success: "Password updated!" };
}