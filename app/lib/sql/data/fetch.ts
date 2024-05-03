import { Category, Product, User } from "@/app/lib/definitions";
import { execQuery, mergeQuery } from "@/app/lib/sql/sql";
import { ProductRecord, UserRecord } from "@/app/lib/sql/types/definitions";
import { category, product, user } from "@/app/lib/sql/constants/queries";
import { productSchema, userSchema } from "@/app/lib/sql/types/schemas";
import { SafeParseReturnType } from "zod";

export async function fetchUserByEMail ( email: string ): Promise<User | undefined>
{
  const rows: UserRecord[] = await execQuery<UserRecord>( mergeQuery( user, `WHERE email = ?` ), [ email ] );
  if ( !rows.length ) return undefined;
  const parsed: SafeParseReturnType<UserRecord, User> = userSchema.safeParse( rows[ 0 ] );
  if ( !parsed.success ) return undefined;
  return parsed.data;
}

export async function fetchCategories (): Promise<Category[] | undefined>
{
  const rows: Category[] = await execQuery<Category>( category );
  if ( !rows.length ) return undefined;
  return rows;
}

export async function fetchCategoryByName ( name: string ): Promise<Category | undefined>
{
  const rows: Category[] = await execQuery<Category>( mergeQuery( category, `WHERE name = ?` ), [ name ] );
  if ( !rows.length ) return undefined;
  return rows[ 0 ];
}

export async function fetchProductsInCategory ( category: Category ): Promise<Product[] | undefined>
{
  const rows: ProductRecord[] = await execQuery<ProductRecord>( mergeQuery( product, `WHERE category_id = ?` ), [ category.id ] );
  if ( !rows.length ) return undefined;
  const parsed: SafeParseReturnType<ProductRecord, Product>[] = rows.map( ( row: ProductRecord ) => productSchema.safeParse( row ) );
  if ( parsed.some( ( p: SafeParseReturnType<ProductRecord, Product> ): boolean => !p.success ) ) return undefined;
  return parsed.map( ( p: SafeParseReturnType<ProductRecord, Product> ): Product => p.data as Product );
}