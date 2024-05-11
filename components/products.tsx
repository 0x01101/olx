"use client";

import { ProductDTO } from "@/lib/definitions";
import { ProductCard } from "@/components/product-card";
import { Widget } from "@/components/main/widget";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { splitIntoChunks } from "@/lib/arrays";

interface ProductsProps
{
  products: ProductDTO[];
}

export function Products ( { products }: ProductsProps ): JSX.Element
{
  const productsPerPage: number = 10;
  const amountOfPages: number = Math.ceil( products.length / productsPerPage );
  const pages: ProductDTO[][] = splitIntoChunks<ProductDTO>( products, productsPerPage );
  
  const getPagesAvailable = ( page: number ): number[] =>
  {
    const isFirstPage: boolean = page <= 1;
    const isLastPage: boolean = !isFirstPage && page >= amountOfPages;
    
    return ( isFirstPage ? [ page, page + 1, page + 2 ] : isLastPage ? [ page - 2, page - 1, page ] : [ page - 1, page, page + 1 ] )
    .filter( ( pageNum: number ) => pageNum > 0 && pageNum <= amountOfPages );
  };
  
  const [ page, setPage ] = useState<number>( 1 );
  const [ pagesAvailable, setPagesAvailable ] = useState<number[]>( getPagesAvailable( page ) );
  
  const handlePageChange = ( pageNum: number ): void =>
  {
    setPage( pageNum );
    setPagesAvailable( getPagesAvailable( pageNum ) );
  };
  
  return (
    <>
      <Widget title={"Filters"}>
        <></>
      </Widget>
      <Widget>
        <div className={"w-full h-full flex flex-col justify-center gap-y-4"}>
          {pages[ page - 1 ].map( ( product: ProductDTO, index: number ) => <ProductCard key={index} product={product} /> )}
        </div>
        <Pagination className={"m-5"}>
          <PaginationContent>
            {page <= 1 ? <></> : (
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => handlePageChange( page - 1 )} />
              </PaginationItem>
            )}
            {pagesAvailable.map( ( pageNum: number ) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange( pageNum )}
                  isActive={page === pageNum}
                >{pageNum}</PaginationLink>
              </PaginationItem>
            ) )}
            {page >= amountOfPages ? <></> : (
              <PaginationItem>
                <PaginationNext href="#" onClick={() => handlePageChange( page + 1 )} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </Widget>
    </>
  );
}