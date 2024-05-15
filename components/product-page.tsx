"use client";

import { ProductDTO } from "@/lib/definitions";
import { Widget } from "@/components/widget";
import { Card, CardContent } from "@/components/ui/card";
import { ProductSearchBar } from "@/components/main/product-searchbar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

interface ProductPageProps
{
  product: ProductDTO;
}

export default function ProductPage ( { product }: ProductPageProps ): JSX.Element
{
  return (
    <>
      <ProductSearchBar />
      <Widget className={"flex items-center justify-center"}>
        <div className={"flex flex-row w-[70%] space-x-3"}>
          <div className={"flex flex-col w-[66%]"}>
            <Card className={"flex w-full items-center justify-center p-0"}>
              <CardContent>
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {product.images.map( ( image, index ) => (
                      <CarouselItem key={index}>
                        <img src={image.url} alt={product.name} className="object-cover w-full h-64" />
                      </CarouselItem>
                    ) )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>
          <div className={"flex flex-col w-[33%]"}>
            <Card>
              <CardContent>
              
              </CardContent>
            </Card>
          </div>
        </div>
      </Widget>
    </>
  );
}