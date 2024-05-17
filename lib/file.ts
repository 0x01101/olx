"use server";

import * as fs from "fs";
import path from "path";

export async function convertFileToBase64 ( file: File ): Promise<string>
{
  return new Promise( ( resolve, reject ) =>
  {
    const reader = new FileReader();
    reader.onload = () => resolve( reader.result as string );
    reader.onerror = error => reject( error );
    reader.readAsDataURL( file );
  } );
}

export async function rmrf ( dirPath: string ): Promise<void>
{
  if ( !fs.existsSync( dirPath ) ) return;
  fs.readdirSync( dirPath ).forEach( ( file: string ): void =>
  {
    const currentPath: string = path.join( dirPath, file );
    if ( fs.lstatSync( currentPath ).isDirectory() )
      rmrf( currentPath );
    else
      fs.unlinkSync( currentPath );
  } );
  fs.rmdirSync( dirPath );
}