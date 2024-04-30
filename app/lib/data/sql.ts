import * as mariadb from "mariadb";
import { Pool, QueryOptions } from "mariadb";
import config from "@/config.json";
import { Row, SQLType, TableConfig } from "@/app/lib/definitions";

declare global
{
  var mariadbPool: mariadb.Pool | undefined; // "var" is needed due to `TS2339: Property  mariadbPool  does not exist on type  typeof globalThis` error (fuck)
}

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

export function mergeQuery ( baseQuery: string, toMerge: string ): string
{
  if ( baseQuery.trim().endsWith( ";" ) ) return baseQuery.replace( /;\s*$/im, ` ${toMerge};` );
  else return `${baseQuery} ${toMerge}`;
}

export class Table
{
  public script: string;
  
  public constructor ( tableConfig: TableConfig )
  {
    let script: string = "";
    script += `create table ${tableConfig.name}` + `\n` + `(` + `\n`;
    script += `id INT PRIMARY KEY AUTO_INCREMENT,`
    script += tableConfig.rows.map( ( row: Row ): string =>
    {
      const typeObj: SQLType = row.type;
      const useParenthesis: boolean = !!( typeObj.values || typeObj.size || typeObj.precision );
      const type: string = `
      ${typeObj.name}${useParenthesis ? "(" : ""}
      ${typeObj.values || ""}
      ${typeObj.size || ""}
      ${typeObj.size && typeObj.precision ? ", " : ""}
      ${typeObj.precision || ""}
      ${typeObj.name}${useParenthesis ? ")" : ""}
      `.replace( /\n/g, "" );
      return `\t${row.name} ${type} ${row.default ? `default ${row.default}` : ""} ${row.unique ? "unique" : ""} ${row.notNull ? "not null" : ""}`;
    } ).join( ",\n" );
    script += `);`;
    
    this.script = script;
  }
}