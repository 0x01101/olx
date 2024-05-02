import { Category } from "@/app/lib/definitions";

export interface UserInfoRecord
{
  id: number;
  name: string;
  username: string;
  role: string;
  watched_category_ids: string;
  created_at: Date;
}

export interface ProductRecord
{
  id: number;
  uuid: string;
  condition: string;
  name: string;
  description: string;
  price: number;
  negotiable: boolean;
  active: boolean;
  created_at: Date;
  
  category_id: number;
  category_name: string;
  category_logo_path: string;
  category_created_at: Date;
  
  seller_id: number;
  seller_username: string;
  seller_name: string;
  seller_role: string;
  seller_watched_category_ids: string;
  seller_created_at: Date;
}