"use server";

import { ServerResponse } from "@/lib/definitions";
import { auth } from "@/auth";
import { ExtendedUser } from "@/next-auth";
import { Product, UserRole } from "@prisma/client";
import { messageProvider } from "@/lib/messages";
import { db } from "@/lib/db";
import path from "path";
import { rmrf } from "@/actions/rm-rf";

export async function deleteProduct ( { id }: { id: string } ): Promise<ServerResponse>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return { error: messageProvider.error.noUser };
  if ( user.role !== UserRole.ADMIN ) return { error: messageProvider.error.noPermissions };
  
  await db.images.deleteMany( {
    where: {
      productId: id,
    },
  } );
  
  const product: Product | undefined = await db.product.delete( {
    where: { id },
  } );
  
  if ( product )
    rmrf( path.join( process.cwd(), "public", "uploads", "listing", id ) );
  
  return { success: messageProvider.success.productDeleted };
}

export async function deleteCategory ( { id }: { id: number } ): Promise<ServerResponse>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return { error: messageProvider.error.noUser };
  if ( user.role !== UserRole.ADMIN ) return { error: messageProvider.error.noPermissions };
  
  await db.product.deleteMany( {
    where: {
      category_id: id,
    },
  } );
  
  await db.category.delete( {
    where: { id },
  } );
  
  return { success: messageProvider.success.categoryDeleted };
}

export async function deleteUser ( { id }: { id: string } ): Promise<ServerResponse>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return { error: messageProvider.error.noUser };
  if ( user.role !== UserRole.ADMIN && user.id !== id )
    return { error: messageProvider.error.noPermissions };
  
  await db.account.delete( {
    where: { userId: id },
  } );
  
  await db.user.delete( {
    where: { id },
  } );
  
  return { success: messageProvider.success.userDeleted };
}