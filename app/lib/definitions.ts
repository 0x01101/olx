export enum Role
{
  ADMIN = "admin",
  USER = "user"
}

export interface JoinedSeller
{
  seller_id: number,
  seller_username: string,
  seller_email: string,
  seller_password: string,
  seller_role: Role & string,
  seller_created_at: Date
}

export interface JoinedBidder
{
  bidder_id: number,
  bidder_username: string,
  bidder_email: string,
  bidder_password: string,
  bidder_role: Role & string,
  bidder_created_at: Date
}

export interface JoinedCategory
{
  category_id: number,
  category_name: string,
  category_created_at: Date,
}

export interface JoinedProduct
{
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_created_at: Date;
}

export type RawProductRecord = Product & JoinedSeller & JoinedCategory
export type RawBidRecord =
  Bid
  & Product
  & JoinedCategory
  & JoinedProduct
  & JoinedSeller
  & Omit<User, "id" | "created_at">
  & { user_created_at: Date, user_id: number }
export type RawTransactionRecord = Transaction & JoinedProduct & JoinedSeller & JoinedCategory & JoinedBidder

export interface User
{
  id: number;
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
  created_at: Date;
}

export interface Product
{
  id: number;
  seller: User;
  name: string;
  description: string;
  price: number;
  category: Category;
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