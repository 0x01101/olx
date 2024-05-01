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

/**
 * Function to fetch all users from the database.
 * @returns {Promise<User[]>} - An array of User objects.
 */
export async function fetchUsers (): Promise<User[]>
{
  const rows: ( Omit<User, "watched_category_ids"> & { watched_category_ids: string } )[] = await execQuery( users );
  return rows.map( row => ( {
    ...row,
    watched_category_ids: row.watched_category_ids.split( "," ).map( ( str: string ): number => parseInt( str ) ),
  } ) );
}

/**
 * Function to fetch all categories from the database.
 * @returns {Promise<Category[]>} - An array of Category objects.
 */
export async function fetchCategories (): Promise<Category[]>
{
  return await execQuery( categories );
}

/**
 * Function to fetch all products from the database.
 * @returns {Promise<Product[]>} - An array of Product objects.
 */
export async function fetchProducts (): Promise<Product[]>
{
  const rows: RawProductRecord[] = await execQuery( products );
  return rows.map( ( row: RawProductRecord ): Product => assembleProduct( row ) );
}

/**
 * Function to fetch all bids from the database.
 * @returns {Promise<Bid[]>} - An array of Bid objects.
 */
export async function fetchBids (): Promise<Bid[]>
{
  const rows: RawBidRecord[] = await execQuery( bids );
  return rows.map( ( row: RawBidRecord ): Bid => assembleBid( row ) );
}

/**
 * Function to fetch all transactions from the database.
 * @returns {Promise<Transaction[]>} - An array of Transaction objects.
 */
export async function fetchTransactions (): Promise<Transaction[]>
{
  const rows: RawTransactionRecord[] = await execQuery( transactions );
  return rows.map( ( row: RawTransactionRecord ): Transaction => assembleTransaction( row ) );
}

/**
 * Function to fetch all notifications from the database.
 * @returns {Promise<Notification[]>} - An array of Notification objects.
 */
export async function fetchNotifications (): Promise<Notification[]>
{
  return await execQuery( notifications );
}

/**
 * Function to fetch a category by its name from the database.
 * @param {string} name - The name of the category.
 * @returns {Promise<Category>} - The Category object.
 */
export async function fetchCategoryByName ( name: string ): Promise<Category>
{
  return ( await execQuery( mergeQuery( categories, `WHERE LOWER(name) = ?` ), name.toLowerCase() ) )[ 0 ];
}

/**
 * Function to fetch all products in a specific category from the database.
 * @param {Category} category - The Category object.
 * @returns {Promise<Product[]>} - An array of Product objects.
 */
export async function fetchProductsInCategory ( category: Category ): Promise<Product[]>
{
  const rows: RawProductRecord[] = await execQuery( mergeQuery( products, `WHERE category_id = ?` ), [ category.id ] );
  return rows.map( ( row: RawProductRecord ): Product => assembleProduct( row ) );
}

/**
 * Function to fetch a user by their email from the database.
 * @param {string} email - The email of the user.
 * @returns {Promise<User | undefined>} - The User object or undefined if not found.
 */
export async function fetchUserByEMail ( email: string ): Promise<User | undefined>
{
  const rows: User[] = await execQuery( mergeQuery( users, `WHERE email = ?` ), [ email ] );
  return ( rows.length > 0 ? rows[ 0 ] : undefined );
}