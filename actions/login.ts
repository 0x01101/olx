"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export async function login ( values: z.infer<typeof LoginSchema> ): Promise<{ success?: string, error?: string }>
{
  const validatedFields = LoginSchema.safeParse( values );
  
  if ( !validatedFields.success )
  {
    return { error: "Invalid fields" };
  }
  
  return { success: "Email sent" };
}