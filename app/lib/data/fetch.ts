import {
  Bid,
  Category,
  Notification,
  Product,
  RawBidRecord,
  RawProductRecord,
  RawTransactionRecord,
  Transaction,
  User,
} from "@/app/lib/definitions";
import { execQuery, mergeQuery } from "@/app/lib/data/sql";
import { bids, categories, notifications, products, transactions, users } from "@/app/lib/constants/queries";
import { assembleBid, assembleCategory, assembleProduct, assembleTransaction } from "@/app/lib/assemble";

export async function fetchUsers (): Promise<User[]>
{
  const rows: ( Omit<User, "watched_category_ids"> & { watched_category_ids: string } )[] = await execQuery( users );
  return rows.map( row => ( {
    ...row,
    watched_category_ids: row.watched_category_ids.split( "," ).map( ( str: string ): number => parseInt( str ) ),
  } ) );
}

export async function fetchCategories (): Promise<Category[]>
{
  return await execQuery( categories );
}

export async function fetchProducts (): Promise<Product[]>
{
  const rows: RawProductRecord[] = await execQuery( products );
  return rows.map( ( row: RawProductRecord ): Product => assembleProduct( row ) );
}

export async function fetchBids (): Promise<Bid[]>
{
  const rows: RawBidRecord[] = await execQuery( bids );
  return rows.map( ( row: RawBidRecord ): Bid => assembleBid( row ) );
}

export async function fetchTransactions (): Promise<Transaction[]>
{
  const rows: RawTransactionRecord[] = await execQuery( transactions );
  return rows.map( ( row: RawTransactionRecord ): Transaction => assembleTransaction( row ) );
}

export async function fetchNotifications (): Promise<Notification[]>
{
  return await execQuery( notifications );
}

export async function fetchCategoryByName ( name: string ): Promise<Category>
{
  return ( await execQuery( mergeQuery( categories, `WHERE LOWER(name) = ?` ), name.toLowerCase() ) )[ 0 ];
}

export async function fetchProductsInCategory ( category: Category ): Promise<Product[]>
{
  const rows: RawProductRecord[] = await execQuery( mergeQuery( products, `WHERE category_id = ?` ), [ category.id ] );
  return rows.map( ( row: RawProductRecord ): Product => assembleProduct( row ) );
}