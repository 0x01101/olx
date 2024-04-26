import * as mariadb from "mariadb";
import { Pool, QueryOptions } from "mariadb";
import config from "@/config.json";

declare global
{
  var mariadbPool: mariadb.Pool | undefined; // "var" is needed due to `TS2339: Property  mariadbPool  does not exist on type  typeof globalThis` error (fuck)
}

function connectOnceToDatabase (): Pool
{1
  if ( !global.mariadbPool )
  {
    global.mariadbPool = mariadb.createPool( {
      host:            config.MySQLHost,
      port:            config.MySQLPort,
      user:            config.MySQLUser,
      password:        config.MySQLPass,
      database:        config.MySQLDB,
      connectionLimit: 1000,
    } );
  }
  return global.mariadbPool;
}

const pool: Pool = connectOnceToDatabase();

export async function execQuery ( sql: string | QueryOptions, values?: any ): Promise<any[]>
{
  return await pool.query( sql, values );
}

export async function closePool (): Promise<void>
{
  if ( global.mariadbPool )
  {
    await global.mariadbPool.end();
  }
}