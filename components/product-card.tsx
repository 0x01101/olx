"use client";

import { ProductDTO } from "@/lib/definitions";
import { Card, CardContent } from "@/components/ui/card";
import { PreviewableImage } from "@/components/previewable-image";
import { formatDate } from "@/lib/date";
import Link from "next/link";

export function ProductCard ( { product }: { product: ProductDTO } ): JSX.Element
{
  return (
    <Link href={`/offer/${product.id}`}>
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
            <span className={"inline-block"}>
              <p className={"text-xs bg-gray-400 inline p-1 rounded-md text-gray-800 font-bold"}>{product.state}</p>
            </span>
            <div className="flex-grow"/>
            <p className={"text-xs text-gray-300"}>{formatDate( product.createdAt )}</p>
          </div>
          <div className="flex-grow"/>
          <h4 className={"text-xl font-bold"}>{product.price / 100}$</h4>
        </CardContent>
      </Card>
    </Link>
  );
}