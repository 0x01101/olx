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
import { execQuery } from "@/app/lib/data/sql";
import { bids, categories, notifications, products, transactions, users } from "@/app/lib/constants/queries";
import { assembleBid, assembleProduct, assembleTransaction } from "@/app/lib/data/assemble";

// Fetching entire table worth of things
export async function fetchUsers(): Promise<User[]> {
    return await execQuery(users);
}

export async function fetchCategories(): Promise<Category[]> {
    return await execQuery(categories);
}

export async function fetchProducts(): Promise<Product[]> {
    const rows: RawProductRecord[] = await execQuery(products);
    return rows.map((row: RawProductRecord): Product => assembleProduct(row));
}

export async function fetchBids(): Promise<Bid[]> {
    const rows: RawBidRecord[] = await execQuery(bids);
    return rows.map((row: RawBidRecord): Bid => assembleBid(row));
}

export async function fetchTransactions(): Promise<Transaction[]> {
    const rows: RawTransactionRecord[] = await execQuery(transactions);
    return rows.map((row: RawTransactionRecord): Transaction => assembleTransaction(row));
}

export async function fetchNotifications(): Promise<Notification[]> {
    return await execQuery(notifications);
}