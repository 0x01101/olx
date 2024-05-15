"use client";

import { ProductDTO } from "@/lib/definitions";
import { Card, CardContent } from "@/components/ui/card";
import { PreviewableImage } from "@/components/previewable-image";

export function ProductCard ( { product }: { product: ProductDTO } ): JSX.Element
{
  return (
    <Card className={"w-full shadow-md p-2"}>
      <CardContent className={"flex flex-row p-0 space-x-3"}>
        <PreviewableImage
          src={product.image}
          alt={`${product.name} Image`}
          width={150}
          height={150}
          className={"rounded-md"}
        />
        <div className={"flex flex-col"}>
          <h3 className={"font-bold text-2xl"}>{product.name}</h3>
          <p>{product.state}</p>
        </div>
      </CardContent>
    </Card>
  );
}