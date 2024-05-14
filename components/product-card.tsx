"use client";

import { ProductDTO } from "@/lib/definitions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { PreviewableImage } from "@/components/previewable-image";

export function ProductCard ( { product }: { product: ProductDTO } ): JSX.Element
{
  return (
    <Card className={"w-full shadow-md"}>
      <CardHeader>
        <div className={"w-full flex flex-col gap-y-4 items-center justify-center"}>
          <p className={"text-muted-foreground text-sm"}>
            {product.name}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <PreviewableImage src={product.image} alt={`${product.name} Image`} width={100} height={100} />
      </CardContent>
    </Card>
  );
}