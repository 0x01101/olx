import { z } from "zod";
import { ProductRecord, UserRecord } from "@/app/lib/sql/types/definitions";
import { Product, User } from "@/app/lib/definitions";

export const userSchema = z.object( {
  id:                     z.number(),
  email:                  z.string().email(),
  password:               z.string().min( 6 ),
  watched_categories_ids: z.string().regex( /^\d+(,\d+)*$/ ),
} ).transform( ( user: UserRecord ): User => ( {
  id:                 user.id,
  email:              user.email,
  password:           user.password,
  watched_categories: user.watched_categories_ids.split( "," ).map( Number ),
} ) );

export const userInfoSchema = z.object( {
  id:         z.number(),
  username:   z.string().min( 3 ).max( 20 ),
  name:       z.string().max( 100 ),
  role:       z.enum( [ "admin", "user", "moderator" ] ),
  created_at: z.date(),
} );

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
  
  seller_id:         z.number(),
  seller_username:   z.string().min( 3 ).max( 20 ),
  seller_name:       z.string().max( 100 ),
  seller_role:       z.enum( [ "admin", "user", "moderator" ] ),
  seller_created_at: z.date(),
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
    id:         product.seller_id,
    username:   product.seller_username,
    name:       product.seller_name,
    role:       product.seller_role,
    created_at: product.seller_created_at,
  } ),
} ) );