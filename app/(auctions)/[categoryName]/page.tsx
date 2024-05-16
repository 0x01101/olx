import { Category } from "@prisma/client";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductDTO } from "@/lib/definitions";
import { ProductDTOSchema } from "@/schemas";
import { Products } from "@/components/products";

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
  if ( !category && categoryName !== "offers" ) notFound();
  const products = ( await db.product.findMany( {
    ...( category ? { where: { category_id: category.id } } : {} ),
    include: {
      category: true,
      seller:   true,
      images:   true,
    },
  } ) ).map( ( product: ProductDTO ) => ProductDTOSchema.parse( product ) );
  if ( !products ) notFound();
  
  return (
    <Products
      category={category}
      products={products}
    />
  );
}