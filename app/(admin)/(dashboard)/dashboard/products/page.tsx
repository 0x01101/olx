import { Widget } from "@/components/widget";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/dashboard/product-card";
import { FullProduct } from "@/lib/definitions";
import { Products } from "@/components/dashboard/products";

export default async function Page (): Promise<JSX.Element>
{
  const products: FullProduct[] = await db.product.findMany( {
    include: {
      seller:   true,
      category: true,
      images:   true,
    },
  } );
  
  return (
    <Widget title={"Products"}>
      <Products products={products} />
    </Widget>
  );
}