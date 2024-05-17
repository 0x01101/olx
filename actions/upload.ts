"use server";

import path from "path";
import fs from "fs";

export async function uploadFile ( base64Data: string, filePath: string ): Promise<void>
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