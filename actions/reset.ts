"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { ServerResponse } from "@/lib/definitions";
import { getUserByEmail } from "@/data/user";
import { PasswordResetToken, User } from "@prisma/client";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { messageProvider } from "@/lib/messages";

export async function reset ( values: z.infer<typeof ResetSchema> ): Promise<ServerResponse>
{
  const validated = ResetSchema.safeParse( values );
  
  if ( !validated.success )
    return { error: messageProvider.error.parseError };
  
  const { email }: { email: string } = validated.data;
  
  const existingUser: User | null = await getUserByEmail( email );
  
  if ( !existingUser )
    return { error: messageProvider.error.emailDoesntExist };
  
  const passwordResetToken: PasswordResetToken = await generatePasswordResetToken( email );
  await sendPasswordResetEmail( passwordResetToken.email, passwordResetToken.token );
  
  return { success: messageProvider.success.resetEmailSent };
}