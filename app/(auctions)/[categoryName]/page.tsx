import { Widget } from "@/components/main/widget";
import { Category, Product } from "@prisma/client";
import { db, sql } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductDTO, ProductRecord } from "@/lib/definitions";
import { ProductDTOSchema } from "@/schemas";

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
  const products = ( await db.product.findMany( {
    where:   {
      category_id: category.id,
    },
    include: {
      category: true,
      seller:   true,
    },
  } ) ).map( ( product: ProductDTO ) => ProductDTOSchema.parse( product ) );
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