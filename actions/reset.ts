"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { ServerResponse } from "@/lib/definitions";
import { getUserByEmail } from "@/data/user";
import { User } from "@prisma/client";

export async function reset ( values: z.infer<typeof ResetSchema> ): Promise<ServerResponse>
{
  const validated = ResetSchema.safeParse( values );
  
  if ( !validated.success )
    return { error: validated.error.message };
  
  const { email }: { email: string } = validated.data;
  
  const existingUser: User | null = await getUserByEmail( email );
  
  if ( !existingUser )
    return { error: "Email not found" };
  
  // TODO: Generate token and send email
  
  return { success: "Password reset email sent" };
}