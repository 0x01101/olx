import * as mariadb from "mariadb";
import { Pool, PoolConnection, QueryOptions } from "mariadb";
import config from "@/config.json";
import {
  Bid,
  Category, EMail, JoinedProduct,
  Product,
  RawUser, Role, Transaction,
  User,
} from "@/app/lib/definitions";
import { expectContextual } from "sucrase/dist/types/parser/traverser/util";

const pool: Pool = mariadb.createPool( {
  host:     config.MySQLHost,
  port:     config.MySQLPort,
  user:     config.MySQLUser,
  password: config.MySQLPass,
  database: config.MySQLDB,
} );

async function execQuery ( sql: string | QueryOptions, values?: any ): Promise<any[]>
{
  let conn: PoolConnection | undefined = undefined;
  try
  {
    conn = await pool.getConnection();
    return await conn.query( sql, values );
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

export async function fetchUsers (): Promise<User[]>
{
  const rows: RawUser[] = await execQuery( `SELECT *
                                            FROM users` );
  return rows.map( ( rawUser: RawUser ): User => ( {
    ...rawUser,
    email: rawUser.email as EMail,
    role:  rawUser.role as Role,
  } ) );
}

export async function fetchCategories (): Promise<Category[]>
{
  return await execQuery( `SELECT *
                           FROM categories` );
}

export async function fetchProducts (): Promise<Product[]>
{
  const query: string = `
      SELECT p.id          AS id,
             p.name        AS name,
             p.description AS description,
             p.price       AS price,
             p.category_id AS category_id,
             p.created_at  AS created_at,
             c.name        AS category_name,
             c.created_at  AS category_created_at
      FROM products p
               JOIN
           categories c ON p.category_id = c.id;
  `;
  const rows: JoinedProduct[] = await execQuery( query );
  return rows.map( ( joinedProduct: JoinedProduct ): Product => ( {
    id:          joinedProduct.id,
    seller: {
    
    },
    name:        joinedProduct.name,
    description: joinedProduct.description,
    price:       joinedProduct.price,
    category:    {
      id:         joinedProduct.category_id,
      name:       joinedProduct.category_name,
      created_at: joinedProduct.category_created_at,
    },
    created_at:  joinedProduct.created_at,
  } ) );
}

export async function fetchBids (): Promise<Bid[]> {
  const query: string = `
    SELECT
    FROM bids b
    JOIN
  `
}