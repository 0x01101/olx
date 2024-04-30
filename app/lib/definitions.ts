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

export class DataType
{
  static readonly CHAR = ( size?: number ): SQLType => ( { name: "CHAR", size: size } );
  static readonly VARCHAR = ( size: number ): SQLType => ( { name: "VARCHAR", size: size } );
  static readonly BINARY = ( size?: number ): SQLType => ( { name: "BINARY", size: size } );
  static readonly VARBINARY = ( size: number ): SQLType => ( { name: "VARBINARY", size: size } );
  static readonly TINYBLOB: SQLType = { name: "TINYBLOB" };
  static readonly TINYTEXT: SQLType = { name: "TINYTEXT" };
  static readonly TEXT = ( size: number ): SQLType => ( { name: "TEXT", size: size } );
  static readonly BLOB = ( size: number ): SQLType => ( { name: "BLOB", size: size } );
  static readonly MEDIUMTEXT: SQLType = { name: "MEDIUMTEXT" };
  static readonly MEDIUMBLOB: SQLType = { name: "MEDIUMBLOB" };
  static readonly LONGTEXT: SQLType = { name: "LONGTEXT" };
  static readonly LONGBLOB: SQLType = { name: "LONGBLOB" };
  static readonly ENUM = ( ...values: string[] ): SQLType => ( { name: "ENUM", values: values } );
  static readonly SET = ( ...values: string[] ): SQLType => ( { name: "SET", values: values } );
  
  static readonly BIT = ( size?: number ): SQLType => ( { name: "BIT", size: size } );
  static readonly TINYINT = ( size: number ): SQLType => ( { name: "TINYINT", size: size } );
  static readonly BOOL: SQLType = { name: "BOOL" };
  static readonly BOOLEAN: SQLType = DataType.BOOL;
  static readonly SMALLINT = ( size: number ): SQLType => ( { name: "SMALLINT", size: size } );
  static readonly MEDIUMINT = ( size: number ): SQLType => ( { name: "MEDIUMINT", size: size } );
  static readonly INT = ( size: number ): SQLType => ( { name: "INT", size: size } );
  static readonly INTEGER = DataType.INT;
  static readonly BIGINT = ( size: number ): SQLType => ( { name: "BIGINT", size: size } );
  static readonly FLOAT = ( precision: number ): SQLType => ( { name: "FLOAT", precision: precision } );
  static readonly DOUBLE = ( size: number, precision: number ): SQLType => ( { name: "DOUBLE", size: size, precision: precision } );
  static readonly DECIMAL = ( size: number, precision: number ): SQLType => ( { name: "DECIMAL", size: size, precision: precision } );
  static readonly DEC = DataType.DECIMAL;
  
  static readonly DATE: SQLType = { name: "DATE" };
  static readonly YEAR: SQLType = { name: "YEAR" };
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

export interface TableConfig
{
  name: string;
  rows: Row[];
}

export interface Row
{
  name: string;
  type: SQLType;
  default?: string;
  notNull?: boolean;
  unique?: boolean;
  references?: Table;
}

export interface SQLType
{
  name: string;
  size?: number; // For VARCHAR, etc..
  values?: string[]; // For enums
  precision?: number; // DOUBLE, DECIMAL, etc..
}