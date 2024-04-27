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

export type JoinedUser = {
  [K in keyof User as `user_${string & K}`]: User[K];
};

export type JoinedSeller = {
  [K in keyof User as `seller_${string & K}`]: User[K];
};

export type JoinedBidder = {
  [K in keyof User as `bidder_${string & K}`]: User[K];
};

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