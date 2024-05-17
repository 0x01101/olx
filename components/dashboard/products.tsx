"use client";

import { FullProduct, ServerResponse } from "@/lib/definitions";
import { useState } from "react";
import { ProductCard } from "@/components/dashboard/product-card";
import { deleteProduct } from "@/actions/delete";

interface ProductsProps
{
  products: FullProduct[];
}

export function Products ( { products: ps }: ProductsProps ): JSX.Element
{
  const [ products, setProducts ] = useState<FullProduct[]>( ps );
  
  const deleteCallback = async ( { id }: { id: string } ): Promise<void> =>
  {
    const response: ServerResponse = await deleteProduct( { id } );
    if ( response.success )
      setProducts( products.filter( ( product: FullProduct ): boolean => product.id !== id ) );
  };
  
  return (
    <div
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      className={"grid w-full h-full items-stretch gap-4"}
    >
      {products.map( ( product: FullProduct, index: number ): JSX.Element => (
        <ProductCard key={index} product={product} deleteHandler={deleteCallback} />
      ) )}
    </div>
  );
}