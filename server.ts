import { createServer } from "http";
import { parse, UrlWithParsedQuery } from "url";
import next from "next";
import { NextServer, RequestHandler } from "next/dist/server/next";

const dev: boolean = process.env.NODE_ENV !== "production";
const app: NextServer = next( { dev } );
const handle: RequestHandler = app.getRequestHandler();

app.prepare().then( (): void =>
{
  createServer( async ( req, res ) =>
  {
    const parsedUrl: UrlWithParsedQuery = parse( req.url!, true );
    await handle( req, res, parsedUrl );
  } ).listen( 3000, (): void =>
  {
    console.log( "> Ready on http://localhost:3000" );
  } );
} );