"use client";

import { ProductDTO } from "@/lib/definitions";
import { Widget } from "@/components/widget";
import { Card, CardContent } from "@/components/ui/card";
import { ProductSearchBar } from "@/components/main/product-searchbar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { formatDate } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserAvatar } from "@/components/auth/user-avatar";
import { capitalize } from "@/lib/text";
import { BiSolidLeftArrow } from "react-icons/bi";

interface ProductPageProps
{
  product: ProductDTO;
}

export default function ProductPage ( { product }: ProductPageProps ): JSX.Element
{
  const session = useSession();
  
  return (
    <>
      <ProductSearchBar />
      <Widget className={"flex items-center justify-center"}>
        <div className={"flex flex-row w-[70%] space-x-6"}>
          <div className={"flex flex-col w-[66%] space-y-6"}>
            <Card className={"flex w-full items-center justify-center"}>
              <CardContent className={"p-4"}>
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
            <Card>
              <CardContent className="p-4 space-y-4 flex flex-col">
                <span className="inline-block">
                  <p className="border-primary border-[1px] p-[4px] px-2 rounded inline-block">
                    State: {capitalize( product.state )}
                  </p>
                </span>
                <div className={"w-full border-[1px] border-primary"} />
                <h3 className={"text-xl"}>DESCRIPTION</h3>
                <p className={"inline-block break-words"}>
                  {product.description}
                </p>
                <div className={"w-full border-[1px] border-primary"} />
                <p className={"text-[10px] text-foreground/75"}>ID: {product.id}</p>
              </CardContent>
            </Card>
          
          </div>
          <div className={"flex flex-col w-[33%] space-y-6"}>
            <Card className={"shadow-md"}>
              <CardContent className={"p-4 space-y-4 flex flex-col"}>
                <p className={"text-xs text-gray-300"}>Added {formatDate( product.createdAt )}</p>
                <p className={"text-xl"}>{product.name}</p>
                <p className={"font-bold text-2xl"}>{product.price / 100}$</p>
                <Button disabled={!session.data?.user}>Send message</Button>
              </CardContent>
            </Card>
            <Card className={"shadow-md"}>
              <CardContent className={"p-4 space-y-4 flex flex-col"}>
                <h3 className={"text-xl"}>SELLER</h3>
                <div className={"flex flex-row space-x-3"}>
                  <UserAvatar user={product.seller} />
                  <div className={"flex flex-col text-sm"}>
                    <p>{product.seller.name}</p>
                    <p>User since {formatDate( product.seller.createdAt )}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Widget>
    </>
  );
}