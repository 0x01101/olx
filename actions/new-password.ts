"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { ServerResponse } from "@/lib/definitions";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { PasswordResetToken, User } from "@prisma/client";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { messageProvider } from "@/lib/messages";

export async function newPassword ( values: z.infer<typeof NewPasswordSchema>, token?: string | null ): Promise<ServerResponse>
{
  if ( !token )
    return { error: messageProvider.error.noToken };
  
  const validatedFields = NewPasswordSchema.safeParse( values );
  
  if ( !validatedFields.success )
    return { error: messageProvider.error.parseError };
  
  const { password }: z.infer<typeof NewPasswordSchema> = validatedFields.data;
  
  const existingToken: PasswordResetToken | null = await getPasswordResetTokenByToken( token );
  
  if ( !existingToken )
    return { error: messageProvider.error.invalidToken };
  
  const hasExpired: boolean = new Date( existingToken.expires ) < new Date();
  
  if ( hasExpired )
    return { error: messageProvider.error.expiredToken };
  
  const existingUser: User | null = await getUserByEmail( existingToken.email );
  
  if ( !existingUser )
    return { error: messageProvider.error.emailDoesntExist };
  
  if ( !existingUser.password )
    return { error: messageProvider.error.noPasswordField };
  
  const usingTheSamePassword: boolean = await bcrypt.compare( password, existingUser.password );
  
  if ( usingTheSamePassword )
    return { error: messageProvider.error.reusePassword };
  
  const hashedPassword: string = await bcrypt.hash( password, 10 );
  
  await db.user.update( {
    where: { id: existingUser.id },
    data:  {
      password: hashedPassword,
    },
  } );
  
  await db.passwordResetToken.delete( { where: { id: existingToken.id } } );
  
  return { success: messageProvider.success.passwordUpdated };
}