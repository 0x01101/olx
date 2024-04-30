import { Table } from "@/app/lib/data/sql";

export enum Role
{
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator"
}

export enum Source
{
  SYSTEM = "system",
  MESSAGE = "message",
  NOTIFICATION = "notification",
  WATCHED = "watched"
}

export enum Condition
{
  NEW = "new",
  USED = "used"
}

type UniqForJoinedUserTypes = { watched_category_ids: string }

export type JoinedUser = Omit<{
  [K in keyof User as `user_${string & K}`]: User[K];
}, "user_watched_category_ids"> & UniqForJoinedUserTypes;

export type JoinedSeller = Omit<{
  [K in keyof User as `seller_${string & K}`]: User[K];
}, "seller_watched_category_ids"> & UniqForJoinedUserTypes;

export type JoinedBidder = Omit<{
  [K in keyof User as `bidder_${string & K}`]: User[K];
}, "bidder_watched_category_ids"> & UniqForJoinedUserTypes;

export type AnyJoinedUserOrSmth = JoinedUser | JoinedSeller | JoinedBidder;

export type JoinedCategory = {
  [K in keyof Category as `category_${string & K}`]: Category[K];
};

export type JoinedProduct = {
  [K in keyof Product as `product_${string & K}`]: Product[K];
};

export type RawProductRecord = Product & JoinedSeller & JoinedCategory
export type RawBidRecord =
  Bid
  & Product
  & JoinedCategory
  & JoinedProduct
  & JoinedSeller
  & JoinedUser
export type RawTransactionRecord = Transaction & JoinedProduct & JoinedSeller & JoinedCategory & JoinedBidder

export interface User
{
  id: number;
  uuid: string;
  username: string;
  email: string;
  password: string;
  role: Role | string;
  watched_category_ids: number[];
  created_at: Date;
}

export interface Category
{
  id: number;
  name: string;
  logo_path: string | undefined | null;
  created_at: Date;
}

export interface Product
{
  id: number;
  uuid: string;
  seller: User;
  condition: Condition | string;
  name: string;
  description: string | undefined | null;
  price: number;
  negotiable: boolean;
  category: Category | null | undefined;
  active: boolean;
  created_at: Date;
}

export interface Bid
{
  id: number;
  user: User;
  product: Product;
  amount: number;
  created_at: Date;
}

export interface Transaction
{
  id: number;
  bidder: User;
  seller: User;
  product: Product;
  amount: number;
  created_at: Date;
}

export interface Notification
{
  id: number;
  source: Source | string;
  user_id: number;
  title: string;
  content: string;
  created_at: Date;
}