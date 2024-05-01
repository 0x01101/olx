import * as mariadb from "mariadb";
import { Pool, QueryOptions } from "mariadb";
import config from "@/config.json";

/**
 * Global declaration for mariadbPool.
 * This is done to creating pool each restart without closing old one.
 */
declare global
{
  var mariadbPool: mariadb.Pool | undefined;
}

/**
 * Function to connect to the database.
 * If a connection does not exist, it creates a new one.
 * @returns {Pool} - The connection pool.
 */
function connectOnceToDatabase (): Pool
{
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

/**
 * Function to execute a query.
 * @param {string | QueryOptions} sql - The SQL query or query options.
 * @param {any} values - The values to be inserted in the query.
 * @returns {Promise<any[]>} - The result of the query.
 */
export async function execQuery<T> ( sql: string | QueryOptions, values?: any ): Promise<T[]>
{
  return (await pool.query( sql, values ) as T[]);
}

/**
 * Function to close the connection pool.
 * @returns {Promise<void>}
 */
export async function closePool (): Promise<void>
{
  if ( global.mariadbPool )
  {
    await global.mariadbPool.end();
  }
}

/**
 * Function to merge two queries.
 * @param {string} baseQuery - The base query.
 * @param {string} toMerge - The query to be merged.
 * @returns {string} - The merged query.
 */
export function mergeQuery ( baseQuery: string, toMerge: string ): string
{
  if ( baseQuery.trim().endsWith( ";" ) ) return baseQuery.replace( /;\s*$/im, ` ${toMerge};` );
  else return `${baseQuery} ${toMerge}`;
}