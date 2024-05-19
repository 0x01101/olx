import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";
import { ProductDTOSchema } from "@/schemas";
import { ProductDTO } from "@/lib/definitions";
import ProductPage from "@/components/product-page";

interface PageProps
{
  params: {
    productId: string
  };
}

export default async function Page ( { params }: PageProps ): Promise<JSX.Element>
{
  const product: Product | null = await db.product.findUnique( {
    where:   {
      id: params.productId,
    },
    include: {
      category: true,
      seller:   true,
      images:   true,
    },
  } );
  
  if ( !product ) notFound();
  const productDTO: ProductDTO = ProductDTOSchema.parse( product );
  
  return (
    <ProductPage product={productDTO} />
  );
}