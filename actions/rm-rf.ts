"use server";

import fs from "fs";
import path from "path";

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