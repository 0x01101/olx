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

export interface User
{
  id: string;
  username: string;
  email: string | null | undefined;
  password: string;
}

export interface UserInfo
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