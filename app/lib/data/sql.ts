import * as mariadb from "mariadb";
import { Pool, PoolConnection, QueryOptions } from "mariadb";
import config from "@/config.json";
import {
  Bid,
  Category,
  Product,
  RawBidRecord,
  RawProductRecord,
  RawTransactionRecord,
  Transaction,
  User,
} from "@/app/lib/definitions";

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

// Fetching entire table worth of things
export async function fetchUsers (): Promise<User[]>
{
  const query: string = `
      SELECT id, username, email, password, role, created_at
      FROM users;
  `;
  const rows: User[] = await execQuery( query );
  return rows.map( ( row: User ): User => ( {
    ...row,
    password: row.password,
  } ) );
}

export async function fetchCategories (): Promise<Category[]>
{
  const query: string = `
      SELECT id, name, created_at
      FROM categories;
  `;
  return await execQuery( query );
}

export async function fetchProducts (): Promise<Product[]>
{
  const query: string = `
      SELECT products.id,
             products.name,
             products.description,
             products.price,
             products.created_at,
             categories.id         as category_id,
             categories.name       as category_name,
             categories.created_at as category_created_at,
             users.id              as seller_id,
             users.username        as seller_username,
             users.email           as seller_email,
             users.password        as seller_password,
             users.role            as seller_role,
             users.created_at      as seller_created_at
      FROM products
               INNER JOIN categories ON products.category_id = categories.id
               INNER JOIN users ON products.user_id = users.id;
  `;
  const rows: RawProductRecord[] = await execQuery( query );
  return rows.map( ( row: RawProductRecord ): Product => ( {
    id:          row.id,
    name:        row.name,
    description: row.description,
    price:       row.price,
    created_at:  row.created_at,
    category:    {
      id:         row.category_id,
      name:       row.category_name,
      created_at: row.category_created_at,
    },
    seller:      {
      id:         row.seller_id,
      username:   row.seller_username,
      email:      row.seller_email,
      password:   row.seller_password,
      role:       row.seller_role,
      created_at: row.seller_created_at,
    },
  } ) );
}

export async function fetchBids (): Promise<Bid[]>
{
  const query: string = `
      SELECT bids.id,
             bids.amount,
             bids.created_at,
             users.id              as user_id,
             users.username,
             users.email,
             users.password,
             users.role,
             users.created_at      as user_created_at,
             products.id           as product_id,
             products.name         as product_name,
             products.description  as product_description,
             products.price        as product_price,
             products.created_at   as product_created_at,
             categories.id         as category_id,
             categories.name       as category_name,
             categories.created_at as category_created_at,
             sellers.id            as seller_id,
             sellers.username      as seller_username,
             sellers.email         as seller_email,
             sellers.password      as seller_password,
             sellers.role          as seller_role,
             sellers.created_at    as seller_created_at
      FROM bids
               INNER JOIN users ON bids.user_id = users.id
               INNER JOIN products ON bids.product_id = products.id
               INNER JOIN categories ON products.category_id = categories.id
               INNER JOIN users AS sellers ON products.user_id = sellers.id;
  `;
  const rows: RawBidRecord[] = await execQuery( query );
  return rows.map( ( row: RawBidRecord ): Bid => ( {
    id:         row.id,
    amount:     row.amount,
    created_at: row.created_at,
    user:       {
      id:         row.user_id,
      username:   row.username,
      email:      row.email,
      password:   row.password,
      role:       row.role,
      created_at: row.user_created_at,
    },
    product:    {
      id:          row.product_id,
      name:        row.product_name,
      description: row.product_description,
      price:       row.product_price,
      created_at:  row.product_created_at,
      category:    {
        id:         row.category_id,
        name:       row.category_name,
        created_at: row.category_created_at,
      },
      seller:      {
        id:         row.seller_id,
        username:   row.seller_username,
        email:      row.seller_email,
        password:   row.seller_password,
        role:       row.seller_role,
        created_at: row.seller_created_at,
      },
    },
  } ) );
}

export async function fetchTransactions (): Promise<Transaction[]>
{
  const query: string = `
      SELECT transactions.id,
             transactions.amount,
             transactions.created_at,
             bidders.id            as bidder_id,
             bidders.username      as bidder_username,
             bidders.email         as bidder_email,
             bidders.password      as bidder_password,
             bidders.role          as bidder_role,
             bidders.created_at    as bidder_created_at,
             sellers.id            as seller_id,
             sellers.username      as seller_username,
             sellers.email         as seller_email,
             sellers.password      as seller_password,
             sellers.role          as seller_role,
             sellers.created_at    as seller_created_at,
             products.id           as product_id,
             products.name         as product_name,
             products.description  as product_description,
             products.price        as product_price,
             products.created_at   as product_created_at,
             categories.id         as category_id,
             categories.name       as category_name,
             categories.created_at as category_created_at
      FROM transactions
               INNER JOIN users AS bidders ON transactions.bidder_id = bidders.id
               INNER JOIN users AS sellers ON transactions.seller_id = sellers.id
               INNER JOIN products ON transactions.product_id = products.id
               INNER JOIN categories ON products.category_id = categories.id;
  `;
  const rows: RawTransactionRecord[] = await execQuery( query );
  return rows.map( ( row: RawTransactionRecord ): Transaction => ( {
    id:         row.id,
    amount:     row.amount,
    created_at: new Date( row.created_at ),
    bidder:     {
      id:         row.bidder_id,
      username:   row.bidder_username,
      email:      row.bidder_email,
      password:   row.bidder_password,
      role:       row.bidder_role,
      created_at: row.bidder_created_at,
    },
    seller:     {
      id:         row.seller_id,
      username:   row.seller_username,
      email:      row.seller_email,
      password:   row.seller_password,
      role:       row.seller_role,
      created_at: row.seller_created_at,
    },
    product:    {
      id:          row.product_id,
      name:        row.product_name,
      description: row.product_description,
      price:       row.product_price,
      created_at:  row.product_created_at,
      category:    {
        id:         row.category_id,
        name:       row.category_name,
        created_at: row.category_created_at,
      },
      seller:      {
        id:         row.seller_id,
        username:   row.seller_username,
        email:      row.seller_email,
        password:   row.seller_password,
        role:       row.seller_role,
        created_at: row.seller_created_at,
      },
    },
  } ) );
}

// Fetching with limitations
export async function fetchUsersByProperty ( propertyName: string, propertyValue: any ): Promise<User[]>
{
  const query: string = `
      SELECT id, username, email, password, role, created_at
      FROM users
      WHERE ${propertyName} = ?;
  `;
  const rows: User[] = await execQuery( query, [ propertyValue ] );
  return rows.map( ( row: User ): User => ( {
    ...row,
    password: row.password,
  } ) );
}

export async function fetchCategoriesByProperty ( propertyName: string, propertyValue: any ): Promise<Category[]>
{
  const query: string = `
      SELECT id, name, created_at
      FROM categories
      WHERE ${propertyName} = ?;
  `;
  return await execQuery( query, [ propertyValue ] );
}

export async function fetchProductsByProperty ( propertyName: string, propertyValue: any ): Promise<Product[]>
{
  const query: string = `
      SELECT products.id,
             products.name,
             products.description,
             products.price,
             products.created_at,
             categories.id         as category_id,
             categories.name       as category_name,
             categories.created_at as category_created_at,
             users.id              as seller_id,
             users.username        as seller_username,
             users.email           as seller_email,
             users.password        as seller_password,
             users.role            as seller_role,
             users.created_at      as seller_created_at
      FROM products
               INNER JOIN categories ON products.category_id = categories.id
               INNER JOIN users ON products.user_id = users.id
      WHERE ${propertyName} = ?;
  `;
  const rows: RawProductRecord[] = await execQuery( query, [ propertyValue ] );
  return rows.map( ( row: RawProductRecord ): Product => ( {
    id:          row.id,
    name:        row.name,
    description: row.description,
    price:       row.price,
    created_at:  row.created_at,
    category:    {
      id:         row.category_id,
      name:       row.category_name,
      created_at: row.category_created_at,
    },
    seller:      {
      id:         row.seller_id,
      username:   row.seller_username,
      email:      row.seller_email,
      password:   row.seller_password,
      role:       row.seller_role,
      created_at: row.seller_created_at,
    },
  } ) );
}

export async function fetchBidsByProperty ( propertyName: string, propertyValue: any ): Promise<Bid[]>
{
  const query: string = `
      SELECT bids.id,
             bids.amount,
             bids.created_at,
             users.id              as user_id,
             users.username,
             users.email,
             users.password,
             users.role,
             users.created_at      as user_created_at,
             products.id           as product_id,
             products.name         as product_name,
             products.description  as product_description,
             products.price        as product_price,
             products.created_at   as product_created_at,
             categories.id         as category_id,
             categories.name       as category_name,
             categories.created_at as category_created_at,
             sellers.id            as seller_id,
             sellers.username      as seller_username,
             sellers.email         as seller_email,
             sellers.password      as seller_password,
             sellers.role          as seller_role,
             sellers.created_at    as seller_created_at
      FROM bids
               INNER JOIN users ON bids.user_id = users.id
               INNER JOIN products ON bids.product_id = products.id
               INNER JOIN categories ON products.category_id = categories.id
               INNER JOIN users AS sellers ON products.user_id = sellers.id
      WHERE ${propertyName} = ?;
  `;
  const rows: RawBidRecord[] = await execQuery( query, [ propertyValue ] );
  return rows.map( ( row: RawBidRecord ): Bid => ( {
    id:         row.id,
    amount:     row.amount,
    created_at: row.created_at,
    user:       {
      id:         row.user_id,
      username:   row.username,
      email:      row.email,
      password:   row.password,
      role:       row.role,
      created_at: row.user_created_at,
    },
    product:    {
      id:          row.product_id,
      name:        row.product_name,
      description: row.product_description,
      price:       row.product_price,
      created_at:  row.product_created_at,
      category:    {
        id:         row.category_id,
        name:       row.category_name,
        created_at: row.category_created_at,
      },
      seller:      {
        id:         row.seller_id,
        username:   row.seller_username,
        email:      row.seller_email,
        password:   row.seller_password,
        role:       row.seller_role,
        created_at: row.seller_created_at,
      },
    },
  } ) );
}

export async function fetchTransactionsByProperty ( propertyName: string, propertyValue: any ): Promise<Transaction[]>
{
  const query: string = `
      SELECT transactions.id,
             transactions.amount,
             transactions.created_at,
             bidders.id            as bidder_id,
             bidders.username      as bidder_username,
             bidders.email         as bidder_email,
             bidders.password      as bidder_password,
             bidders.role          as bidder_role,
             bidders.created_at    as bidder_created_at,
             sellers.id            as seller_id,
             sellers.username      as seller_username,
             sellers.email         as seller_email,
             sellers.password      as seller_password,
             sellers.role          as seller_role,
             sellers.created_at    as seller_created_at,
             products.id           as product_id,
             products.name         as product_name,
             products.description  as product_description,
             products.price        as product_price,
             products.created_at   as product_created_at,
             categories.id         as category_id,
             categories.name       as category_name,
             categories.created_at as category_created_at
      FROM transactions
               INNER JOIN users AS bidders ON transactions.bidder_id = bidders.id
               INNER JOIN users AS sellers ON transactions.seller_id = sellers.id
               INNER JOIN products ON transactions.product_id = products.id
               INNER JOIN categories ON products.category_id = categories.id
      WHERE ${propertyName} = ?;
  `;
  const rows: RawTransactionRecord[] = await execQuery( query, [ propertyValue ] );
  return rows.map( ( row: RawTransactionRecord ): Transaction => ( {
    id:         row.id,
    amount:     row.amount,
    created_at: new Date( row.created_at ),
    bidder:     {
      id:         row.bidder_id,
      username:   row.bidder_username,
      email:      row.bidder_email,
      password:   row.bidder_password,
      role:       row.bidder_role,
      created_at: row.bidder_created_at,
    },
    seller:     {
      id:         row.seller_id,
      username:   row.seller_username,
      email:      row.seller_email,
      password:   row.seller_password,
      role:       row.seller_role,
      created_at: row.seller_created_at,
    },
    product:    {
      id:          row.product_id,
      seller:      {
        id:         row.seller_id,
        username:   row.seller_username,
        email:      row.seller_email,
        password:   row.seller_password,
        role:       row.seller_role,
        created_at: row.seller_created_at,
      },
      name:        row.product_name,
      description: row.product_description,
      price:       row.product_price,
      created_at:  row.product_created_at,
      category:    {
        id:         row.category_id,
        name:       row.category_name,
        created_at: row.category_created_at,
      },
    },
  } ) );
}