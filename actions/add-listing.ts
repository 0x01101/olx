"use server";

import * as fs from "fs";
import { ServerResponse } from "@/lib/definitions";
import { z } from "zod";
import { ListingAddSchema } from "@/schemas";

export async function addListing ( formData: z.infer<typeof ListingAddSchema> ): Promise<ServerResponse>
{
  console.log(formData);
  return { success: "Listing added successfully" };
}

async function uploadFile ( formData: FormData | File, path: string ): Promise<void>
{
  const file: File = formData instanceof FormData ? formData.get( "file" ) as File : formData;
  const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
  const buffer: Uint8Array = new Uint8Array( arrayBuffer );
  
  fs.writeFile( `./public/uploads/${path}`, buffer, ( err ) => {} );
}