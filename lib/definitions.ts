import { Product } from "@prisma/client";

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

export type ProductDTO = Omit<Product, "">