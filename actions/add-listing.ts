"use server";

import * as fs from "fs";
import { ServerResponse } from "@/lib/definitions";
import { z } from "zod";
import { ListingAddSchema } from "@/schemas";
import { db } from "@/lib/db";
import { v4 } from "uuid";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ExtendedUser } from "@/next-auth";
import { Product } from "@prisma/client";
import path from "path";

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
  
  if ( !user?.id ) return { error: "Unauthorized" };
  
  const product: Product = await db.product.create( {
    data: {
      id:          id,
      name,
      description,
      price:       Number( price ),
      state,
      category_id: Number( category ),
      image:       `/uploads/listing/${id}/1`,
      seller_id:   user.id,
    },
  } );
  
  if ( !product ) return { error: "Failed to add listing" };
  
  for ( let image of images )
  {
    const fileName: string = `${images.indexOf( image ) + 1}`;
    await uploadFile( image, `listing/${id}/${fileName}` );
  }
  
  db.images.createMany( {
    data: images.map( ( image: string, index: number ) => ( {
      url:       `/uploads/listing/${id}/${index + 1}`,
      productId: id,
    } ) ),
  } );
  
  return { success: "Listing added successfully" };
}

async function uploadFile ( base64Data: string, filePath: string ): Promise<void>
{
  filePath = path.join( process.cwd(), "public", "uploads", filePath );
  const base64Image: string | undefined = base64Data.split( ";base64," ).pop();
  if ( !base64Image ) return;
  const buffer: Buffer = Buffer.from( base64Image, "base64" );
  const directoryPath: string = path.dirname( filePath );
  fs.mkdirSync( directoryPath, { recursive: true } );
  fs.writeFile( filePath, buffer, ( err ) =>
  {
    if ( err ) throw err;
  } );
}