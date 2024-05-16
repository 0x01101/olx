"use server";

import * as fs from "fs";

export async function uploadFile ( formData: FormData | File )
{
  const file: File = formData instanceof FormData ? formData.get( "file" ) as File : formData;
  const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
  const buffer: Uint8Array = new Uint8Array( arrayBuffer );
  
  await fs.writeFile()
}