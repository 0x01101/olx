import { Widget } from "@/components/widget";
import { db } from "@/lib/db";
import { FullProduct } from "@/lib/definitions";
import { Products } from "@/components/dashboard/products/products";
import { Category, User } from "@prisma/client";

export default async function Page (): Promise<JSX.Element>
{
  const products: FullProduct[] = await db.product.findMany( {
    include: {
      seller:   true,
      category: true,
      images:   true,
    },
  } );
  const categories: Category[] = await db.category.findMany();
  const users: User[] = await db.user.findMany();
  
  return (
    <Widget title={"Products"}>
      <Products products={products} categories={categories} users={users} />
    </Widget>
  );
}