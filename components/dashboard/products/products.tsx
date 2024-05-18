"use client";

import { FullProduct, ServerResponse } from "@/lib/definitions";
import { useState } from "react";
import { ProductCard } from "@/components/dashboard/products/product-card";
import { deleteProduct } from "@/actions/delete";
import { Category, Product, User } from "@prisma/client";
import { z } from "zod";
import { SimpleListingUpdateSchema } from "@/schemas";
import { updateProduct } from "@/actions/update";
import { ProductCreateCard } from "@/components/dashboard/products/product-create-card";

interface ProductsProps
{
  products: FullProduct[];
  categories?: Category[];
  users?: User[];
}

export function Products ( { products: ps, categories, users }: ProductsProps ): JSX.Element
{
  const [ products, setProducts ] = useState<FullProduct[]>( ps );
  
  const deleteCallback = async ( { id }: { id: string } ): Promise<void> =>
  {
    const response: ServerResponse = await deleteProduct( { id } );
    if ( response.success )
      setProducts( products.filter( ( product: FullProduct ): boolean => product.id !== id ) );
  };
  
  const updateCallback = async ( product: z.infer<typeof SimpleListingUpdateSchema> & { id: string } ): Promise<void> =>
  {
    const { updated }: ServerResponse & { updated?: FullProduct } = await updateProduct( product );
    if ( updated )
      setProducts( products.map( ( p: FullProduct ): FullProduct => p.id === product.id ? updated : p ) );
  };
  
  return (
    <div
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      className={"grid w-full h-full items-start gap-4"}
    >
      {products.map( ( product: FullProduct, index: number ): JSX.Element => (
        <ProductCard
          key={index}
          deleteHandler={deleteCallback}
          editHandler={updateCallback}
          product={product}
          categories={categories}
          users={users}
        />
      ) )}
      <ProductCreateCard />
    </div>
  );
}