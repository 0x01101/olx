import { z } from "zod";
import { ProductRecord, UserInfoRecord } from "@/app/lib/sql/types/definitions";
import { Product, UserInfo } from "@/app/lib/definitions";

export const userSchema = z.object( {
  id:       z.number(),
  email:    z.string().email(),
  password: z.string().min( 6 ),
} );

export const userInfoSchema = z.object( {
  id:                   z.number(),
  uuid:                 z.string(),
  role:                 z.enum( [ "admin", "user", "moderator" ] ),
  watched_category_ids: z.string().regex( /^[0-9,]+$/ ),
  created_at:           z.date(),
} ).transform( ( userInfo: UserInfoRecord ): UserInfo => ( {
  id:                   userInfo.id,
  uuid:                 userInfo.uuid,
  role:                 userInfo.role,
  watched_category_ids: userInfo.watched_category_ids.split( "," ).map( ( id: string ): number => parseInt( id ) ),
  created_at:           userInfo.created_at,
} ) );

export const productSchema = z.object( {
  id:          z.number(),
  uuid:        z.string(),
  condition:   z.enum( [ "new", "used" ] ),
  name:        z.string(),
  description: z.string(),
  price:       z.number(),
  negotiable:  z.boolean(),
  active:      z.boolean(),
  created_at:  z.date(),
  
  category_id:         z.number(),
  category_name:       z.string(),
  category_logo_path:  z.string(),
  category_created_at: z.date(),
  
  seller_id:                   z.number(),
  seller_uuid:                 z.string(),
  seller_role:                 z.enum( [ "admin", "user", "moderator" ] ),
  seller_watched_category_ids: z.string().regex( /^[0-9,]+$/ ),
  seller_created_at:           z.date(),
} ).transform( ( product: ProductRecord ): Product => ( {
  id:          product.id,
  uuid:        product.uuid,
  condition:   product.condition,
  name:        product.name,
  description: product.description,
  price:       product.price,
  negotiable:  product.negotiable,
  active:      product.active,
  created_at:  product.created_at,
  
  category: {
    id:         product.category_id,
    name:       product.category_name,
    logo_path:  product.category_logo_path,
    created_at: product.category_created_at,
  },
  
  seller: userInfoSchema.parse( {
    id:                   product.seller_id,
    uuid:                 product.seller_uuid,
    role:                 product.seller_role,
    watched_category_ids: product.seller_watched_category_ids,
    created_at:           product.seller_created_at,
  } ),
} ) );