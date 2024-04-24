export type EMail = `${string}@${string}.${string}` & string

export enum Role
{
  ADMIN = "admin",
  USER = "user"
}

export interface User
{
  id: number;
  username: string;
  email: EMail;
  password: string;
  role: Role;
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