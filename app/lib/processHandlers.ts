import { closePool } from "@/app/lib/sql/sql";

const handleExit = async ( signal: string ): Promise<void> =>
{
  console.log( `Received ${signal}. Closing database pool...` );
  await closePool();
  console.log( "Database pool closed. Exiting now." );
  process.exit( 0 );
};

process.on( "SIGINT", () => handleExit( "SIGINT" ) );
process.on( "SIGTERM", () => handleExit( "SIGTERM" ) );

process.on( "uncaughtException", async ( error: Error ): Promise<void> =>
{
  console.error( "Uncaught Exception:", error );
  await handleExit( "uncaughtException" );
} );

process.on( "SIGUSR2", () => handleExit( "SIGUSR2" ) );