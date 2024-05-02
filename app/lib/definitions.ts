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

// User is for authorization
export interface User
{
  id: number;
  email: string;
  password: string;
}

// UserInfo is for non-sensitive user info, for use for example in product listings
export interface UserInfo
{
  id: number;
  username: string;
  name: string;
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
  seller: UserInfo;
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
  user: UserInfo;
  product: Product;
  amount: number;
  created_at: Date;
}

export interface Transaction
{
  id: number;
  bidder: UserInfo;
  seller: UserInfo;
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