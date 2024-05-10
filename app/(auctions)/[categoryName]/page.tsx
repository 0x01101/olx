import { Widget } from "@/components/main/widget";
import { Category, Product } from "@prisma/client";
import { db, sql } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductRecord } from "@/lib/definitions";

interface PageProps
{
  params: {
    categoryName: string
  };
}

export default async function Page ( { params }: PageProps ): Promise<JSX.Element>
{
  const categoryName: string = params.categoryName.trim();
  let category: Category | null = await db.category.findUnique( { where: { name: categoryName } } );
  if ( !category ) notFound();
  const products: Product[] = await sql<ProductRecord>`
  SELECT p.*, u.* FROM Product as p
    inner join User as u on p.seller_id = u.id
  `
  console.log(products);
  if ( !products ) notFound();
  
  return (
    <div>
      <Widget>
        <h1>Page</h1>
      </Widget>
      <Widget>
        <div className={"w-full h-full flex flex-col justify-center"}>
        
        </div>
      </Widget>
    </div>
  );
}