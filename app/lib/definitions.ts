export type EMail = `${string}@${string}.${string}` & string

export enum Role
{
  ADMIN = "admin",
  USER = "user"
}

export type RawUser = Omit<User, "email" | "role"> & { email: string, role: string }
export type JoinedProduct = Omit<Product, "category" | "seller"> & {
  category_id: number,
  category_name: string,
  category_created_at: Date
} & {
  user_id: number,
  user_username: string,
  user_email: string,
  user_password: string
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