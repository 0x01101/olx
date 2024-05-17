import { Category, Images, Product, User, UserRole } from "@prisma/client";

type Prefixed<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K];
}

export interface ServerResponse
{
  success?: string;
  error?: string;
}

export interface UserDTO
{
  id: string;
  name?: string | null;
  image?: string | null;
  role: UserRole;
  createdAt: Date;
}

export type ProductDTO = Product & {
  seller: UserDTO;
  images: Images[];
}

export type FullProduct = Product & { seller: User, category: Category, images: Images[] };