"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export async function register ( values: z.infer<typeof RegisterSchema> ): Promise<{ success?: string, error?: string }>
{
  const validatedFields = RegisterSchema.safeParse( values );
  
  if ( !validatedFields.success )
  {
    return { error: "Invalid fields" };
  }
  
  return { success: "Email sent" };
}