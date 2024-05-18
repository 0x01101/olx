"use server";

import { z } from "zod";
import { SimpleCategoryUpdateSchema } from "@/schemas";
import { FullCategory, ServerResponse } from "@/lib/definitions";
import { db } from "@/lib/db";
import { ExtendedUser } from "@/next-auth";
import { auth } from "@/auth";
import { messageProvider } from "@/lib/messages";
import { UserRole } from "@prisma/client";

export async function addCategory ( { image, name }: z.infer<typeof SimpleCategoryUpdateSchema> & {
  image?: string | null
} ): Promise<ServerResponse & { category?: FullCategory }>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return { error: messageProvider.error.noUser };
  if ( user.role !== UserRole.ADMIN ) return { error: messageProvider.error.noPermissions };
  
  const category: FullCategory = await db.category.create( {
    data:    {
      name,
      image,
    },
    include: {
      Product: true,
    },
  } );
  
  if ( !category ) return { error: messageProvider.error.generic };
  
  return { success: messageProvider.success.categoryCreated, category };
}