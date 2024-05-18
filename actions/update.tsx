"use server";

import { FullCategory, FullProduct, ServerResponse } from "@/lib/definitions";
import { Product, User, UserRole } from "@prisma/client";
import { messageProvider } from "@/lib/messages";
import { ExtendedUser } from "@/next-auth";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { Admin_CategoryUpdateSchema, Admin_ListingUpdateSchema, Admin_UserUpdateSchema } from "@/schemas";

export async function updateProduct ( data: z.infer<typeof Admin_ListingUpdateSchema> & {
  id: string
} ): Promise<ServerResponse & {
  updated?: FullProduct
}>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return { error: messageProvider.error.noUser };
  if ( user.role !== UserRole.ADMIN && user.id !== data.seller_id )
    return { error: messageProvider.error.noPermissions };
  
  let { category, ...cleanData } = data;
  
  const updated: FullProduct = await db.product.update( {
    where:   { id: data.id },
    data:    {
      ...cleanData,
      category_id: Number( category ),
      price:       Number( data.price ),
    },
    include: {
      category: true,
      images:   true,
      seller:   true,
    },
  } );
  
  return { updated, success: messageProvider.success.productUpdated };
}

export async function updateCategory ( { id, name, image }: z.infer<typeof Admin_CategoryUpdateSchema> & {
  id: number
  image?: string | null
} ): Promise<ServerResponse & { updated?: FullCategory }>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return { error: messageProvider.error.noUser };
  if ( user.role !== UserRole.ADMIN )
    return { error: messageProvider.error.noPermissions };
  
  const updated: FullCategory = await db.category.update( {
    where:   { id },
    data:    { name, image },
    include: { Product: true },
  } );
  
  return { updated, success: messageProvider.success.categoryUpdated };
}

export async function updateUser ( { id, ...data }: z.infer<typeof Admin_UserUpdateSchema> & {
  id: string
} ): Promise<ServerResponse & { updated?: User }>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return { error: messageProvider.error.noUser };
  if ( user.role !== UserRole.ADMIN && user.id !== id )
    return { error: messageProvider.error.noPermissions };
  
  const updated: User = await db.user.update( {
    where: { id },
    data,
  } );
  
  return { updated, success: messageProvider.success.userUpdated };
}