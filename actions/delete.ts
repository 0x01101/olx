"use server";

import { ServerResponse } from "@/lib/definitions";
import { auth } from "@/auth";
import { ExtendedUser } from "@/next-auth";
import { Product, UserRole } from "@prisma/client";
import { messageProvider } from "@/lib/messages";
import { db } from "@/lib/db";
import { rmrf } from "@/lib/file";
import path from "path";

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