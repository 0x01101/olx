import { db } from "@/lib/db";
import { Widget } from "@/components/widget";
import { Categories } from "@/components/dashboard/categories/categories";
import { FullCategory } from "@/lib/definitions";

export default async function Page (): Promise<JSX.Element>
{
  const categories: FullCategory[] = await db.category.findMany( { include: { Product: true } } );
  
  return (
    <Widget title={"Categories"}>
      <Categories categories={categories} />
    </Widget>
  );
}