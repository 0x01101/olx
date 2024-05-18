import { Widget } from "@/components/widget";
import { Categories } from "@/components/dashboard/categories/categories";
import { db } from "@/lib/db";
import { FullCategory, FullProduct } from "@/lib/definitions";
import { User } from "@prisma/client";
import { Products } from "@/components/dashboard/products/products";
import { Users } from "@/components/dashboard/users/users";

export default async function Page (): Promise<JSX.Element>
{
  const categories: FullCategory[] = await db.category.findMany( { include: { Product: true } } );
  const products: FullProduct[] = await db.product.findMany( {
    include: {
      seller:   true,
      category: true,
      images:   true,
    },
  } );
  const users: User[] = await db.user.findMany();
  
  return (
    <>
      {/* TODO: CHANGE */}
      <Widget title={"Categories"}>
        <Categories categories={categories} />
      </Widget>
      <Widget title={"Products"}>
        <Products products={products} categories={categories} users={users} />
      </Widget>
      <Widget title={"Users"}>
        <Users users={users} />
      </Widget>
    </>
  );
}