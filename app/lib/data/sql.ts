import * as mariadb from "mariadb";
import { Pool, PoolConnection } from "mariadb";
import config from "@/config.json";
import { User } from "@/app/lib/definitions";

const pool: Pool = mariadb.createPool( {
  host:     config.MySQLHost,
  port:     config.MySQLPort,
  user:     config.MySQLUser,
  password: config.MySQLPass,
  database: config.MySQLDB,
} );

export async function getUsers (): Promise<User[] | void>
{
  let conn: PoolConnection | undefined = undefined;
  try
  {
    conn = await pool.getConnection();
    const rows = await conn.query( `SELECT * FROM users` );
    console.log( rows );
  }
  catch ( e: any )
  {
    throw e;
  }
  finally
  {
    if ( conn ) await conn.end();
  }
}