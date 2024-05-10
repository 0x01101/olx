import { Product, User } from "@prisma/client";

type Prefixed<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K];
}

export interface ServerResponse {
  success?: string;
  error?: string;
}

export interface UserDTO
{
  id: string;
  name?: string;
  image?: string;
  createdAt: Date;
}

export type ProductRecord = Product & User