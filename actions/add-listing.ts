"use server";

import { ServerResponse } from "@/lib/definitions";
import { z } from "zod";
import { ListingAddSchema } from "@/schemas";
import { db } from "@/lib/db";
import { v4 } from "uuid";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ExtendedUser } from "@/next-auth";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import { messageProvider } from "@/lib/messages";
import { uploadFile } from "@/actions/upload";

export async function addListing ( {
  name,
  description,
  price,
  state,
  category,
}: z.infer<typeof ListingAddSchema>, images: string[] ): Promise<ServerResponse>
{
  const id: string = v4();
  const session: Session | null = await auth();
  const user: ExtendedUser | undefined = session?.user;
  
  if ( !user?.id ) return { error: messageProvider.error.noUser };
  
  const product: Product = await db.product.create( {
    data: {
      id:          id,
      name,
      description,
      price:       Number( price ),
      state,
      category_id: Number( category ),
      image:       `/uploads/listing/${id}/1.jpg`,
      seller_id:   user.id,
    },
  } );
  
  if ( !product ) return { error: messageProvider.error.generic };
  
  for ( let image of images )
  {
    const fileName: string = `${images.indexOf( image ) + 1}.jpg`;
    await uploadFile( image, `listing/${id}/${fileName}` );
  }
  
  const imgs = images.map( ( _: string, index: number ) => ( {
    url:       `/uploads/listing/${id}/${index + 1}.jpg`,
    productId: product.id,
  } ) );
  
  await db.images.createMany( {
    data:           imgs,
    skipDuplicates: true,
  } );
  
  redirect( `/offer/${product.id}` );
}