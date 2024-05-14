"use client";

import { ProductDTO } from "@/lib/definitions";
import { ProductCard } from "@/components/product-card";
import { Widget } from "@/components/main/widget";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { splitIntoChunks } from "@/lib/arrays";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { getCategories } from "@/actions/fetch";
import { ReadonlyURLSearchParams, redirect, RedirectType, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductsProps
{
  products: ProductDTO[];
  category?: Category | null;
}

export function Products ( { products, category }: ProductsProps ): JSX.Element
{
  const pathname: string = usePathname()
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const params: URLSearchParams = new URLSearchParams(searchParams.toString());
  
  const priceFromString: string | null = searchParams.get( "priceFrom" );
  const priceToString: string | null = searchParams.get( "priceTo" );
  const priceFrom: number = priceFromString ? Number( priceFromString ) : 0;
  const priceTo: number = priceToString ? Number( priceToString ) : 0;
  
  const productsPerPage: number = 10;
  const amountOfPages: number = Math.ceil( products.length / productsPerPage );
  
  const getPagesAvailable = ( page: number ): number[] =>
  {
    const isFirstPage: boolean = page <= 1;
    const isLastPage: boolean = !isFirstPage && page >= amountOfPages;
    
    return ( isFirstPage ? [ page, page + 1, page + 2 ] : isLastPage ? [ page - 2, page - 1, page ] : [ page - 1, page, page + 1 ] )
    .filter( ( pageNum: number ) => pageNum > 0 && pageNum <= amountOfPages );
  };
  
  const [ page, setPage ] = useState<number>( 1 );
  const [ pages, setPages ] = useState<ProductDTO[][]>( splitIntoChunks<ProductDTO>( products, productsPerPage ) );
  const [ pagesAvailable, setPagesAvailable ] = useState<number[]>( getPagesAvailable( page ) );
  const [ categories, setCategories ] = useState<Category[]>( [] );
  
  useEffect( (): void =>
  {
    const fetchCategories = async (): Promise<void> =>
    {
      const result: Category[] = await getCategories();
      setCategories( result );
    };
    
    fetchCategories().then();
  }, [] );
  
  const handlePageChange = ( pageNum: number ): void =>
  {
    setPage( pageNum );
    setPagesAvailable( getPagesAvailable( pageNum ) );
  };
  
  return (
    <>
      <Widget title={"Filters"}>
        <div className={"flex flex-row space-x-4"}>
          <div>
            <Label>Category</Label>
            <Select onValueChange={(value) => redirect(`/${value}?${searchParams.toString()}`, RedirectType.push)}>
              <SelectTrigger className={"w-[180px] border-primary"}>
                <SelectValue placeholder={category?.name ?? "Every category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value={"offers"}>Every category</SelectItem>
                  {categories.map( ( c: Category, i: number ) => (
                    <SelectItem value={c.name.toLowerCase()} key={i}>{c.name}</SelectItem>
                  ) )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price from</Label>
            <Input
              placeholder={"0"}
              type={"number"}
              className={"w-[80px] border-primary"}
              onBlur={(event) => {
                params.set("priceFrom", event.target.value);
                redirect(`${pathname}?${params.toString()}`, RedirectType.push);
              }}
            />
          </div>
        </div>
      </Widget>
      <Widget title={`Found ${products.length} results`}>
        <div className={"w-full h-full flex flex-col justify-center gap-y-4"}>
          {pages[ page - 1 ]?.map( ( product: ProductDTO, index: number ) => <ProductCard
            key={index}
            product={product}
          /> ) ?? <h1 className={"text-destructive text-center text-2xl"}>No results found</h1>}
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