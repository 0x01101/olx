import { Widget } from "@/components/widget";
import { Product } from "@prisma/client";
import { db } from "@/lib/db";

export default async function Page (): Promise<JSX.Element>
{
  const products: Product[] = await db.product.findMany();
  
  return (
    <Widget title={"Products"}>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}
        className={"grid w-full h-full gap-x-0 items-stretch gap-4"}
      >
      
      </div>
    </Widget>
  );
}