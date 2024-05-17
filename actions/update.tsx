"use server";

import { ServerResponse } from "@/lib/definitions";
import { Product, UserRole } from "@prisma/client";
import { messageProvider } from "@/lib/messages";
import { ExtendedUser } from "@/next-auth";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function updateProduct ( product: Product ): Promise<ServerResponse & { updated?: Product }>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return { error: messageProvider.error.noUser };
  if ( user.role !== UserRole.ADMIN || user.id !== product.seller_id )
    return { error: messageProvider.error.noPermissions };
  
  // TODO: Add check if user is admin to not allow normal user to change product's seller
  const updated: Product = await db.product.update( {
    where: { id: product.id },
    data:  {
      ...product
    },
  } );
  
  return { success: messageProvider.success.productUpdated };
}