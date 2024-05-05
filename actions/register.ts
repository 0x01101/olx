"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { compare, hash } from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { User, VerificationToken } from "@prisma/client";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { ServerResponse } from "@/lib/definitions";
import { jokeFeatures, messageProvider } from "@/lib/messages";

export async function register ( values: z.infer<typeof RegisterSchema> ): Promise<ServerResponse>
{
  const validatedFields = RegisterSchema.safeParse( values );
  
  if ( !validatedFields.success )
    return { error: messageProvider.error.parseError };
  
  const { email, password, name }: { email: string, password: string, name: string } = validatedFields.data;
  const hashedPassword: string = await hash( password, 10 );
  
  if ( jokeFeatures )
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
      return { error: messageProvider.misc.passwordAlreadyInUse.replace( "%", reusedPassword.email ) };
  }
  
  const existingUser: User | null = await getUserByEmail( email );
  
  if ( existingUser )
    return { error: messageProvider.error.emailInUse };
  
  await db.user.create( { data: { email, password: hashedPassword, name } } );
  
  const verificationToken: VerificationToken = await generateVerificationToken( email );
  
  await sendVerificationEmail( verificationToken.email, verificationToken.token );
  
  return { success: messageProvider.success.confirmationEmailSent };
}