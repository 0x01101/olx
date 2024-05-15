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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { getCategories } from "@/actions/fetch";
import { ReadonlyURLSearchParams, redirect, RedirectType, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

class SortOptions
{
  public static options: SortOptions[] = [];
  
  public static get ( key: string | null | undefined ): SortOptions | undefined
  {
    if ( !key ) return;
    return SortOptions.options.find( ( option: SortOptions ): boolean => option.key === key );
  }
  
  public key: string;
  public name: string;
  public sortCallback: ( a: ProductDTO, b: ProductDTO ) => number;
  
  public constructor ( key: string, name: string, sortCallback: ( a: ProductDTO, b: ProductDTO ) => number )
  {
    this.key = key;
    this.name = name;
    this.sortCallback = sortCallback;
    
    SortOptions.options.push( this );
  }
}

new SortOptions( "new", "Newest First",
  ( a: ProductDTO, b: ProductDTO ): number => a.createdAt.getTime() - b.createdAt.getTime() );
new SortOptions( "cheap", "Cheapest First", ( a: ProductDTO, b: ProductDTO ): number => a.price - b.price );
new SortOptions( "expensive", "Most Expensive First",
  ( a: ProductDTO, b: ProductDTO ): number => b.price - a.price );
new SortOptions( "random", "Random", (): number => Math.random() - 0.5 );

interface ProductsProps
{
  products: ProductDTO[];
  category?: Category | null;
}

export function Products ( { products, category }: ProductsProps ): JSX.Element
{
  const pathname: string = usePathname();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const params: URLSearchParams = new URLSearchParams( searchParams.toString() );
  
  const priceFromString: string | null = searchParams.get( "priceFrom" );
  const priceToString: string | null = searchParams.get( "priceTo" );
  const sortByString: string | null = searchParams.get( "sortBy" );
  const priceFrom: number | undefined = priceFromString ? Number( priceFromString ) : undefined;
  const priceTo: number | undefined = priceToString ? Number( priceToString ) : undefined;
  const sortBy: SortOptions | undefined = SortOptions.get( sortByString );
  
  if ( priceFrom ) products = products.filter( ( p: ProductDTO ): boolean => p.price >= priceFrom );
  if ( priceTo ) products = products.filter( ( p: ProductDTO ): boolean => p.price <= priceTo );
  if ( sortBy ) products = products.sort( sortBy.sortCallback );
  
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
        <div className={"flex flex-row space-x-4 w-full mb-7 pb-2 border-b-[1px] border-primary"}>
          <div>
            <Label>Category</Label>
            <Select onValueChange={( value ) => redirect( `/${value}?${searchParams.toString()}`, RedirectType.push )}>
              <SelectTrigger className={"w-[180px] border-primary"}>
                <SelectValue placeholder={category?.name ?? "Every category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"offers"}>Every category</SelectItem>
                  {categories.map( ( c: Category, i: number ) => (
                    <SelectItem value={c.name.toLowerCase()} key={i}>{c.name}</SelectItem>
                  ) )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* TODO: FIX */}
          <div>
            <Label>Price from</Label>
            <Input
              placeholder={"0"}
              defaultValue={priceFrom}
              type={"number"}
              className={"w-[100px] border-primary"}
              onBlur={( event ) =>
              {
                if ( !event.target.value ) return;
                params.set( "priceFrom", event.target.value );
                redirect( `${pathname}?${params.toString()}`, RedirectType.push );
              }}
            />
          </div>
          <div>
            <Label>Price to</Label>
            <Input
              placeholder={"0"}
              defaultValue={priceTo}
              type={"number"}
              className={"w-[100px] border-primary"}
              onBlur={( event ) =>
              {
                if ( !event.target.value ) return;
                params.set( "priceTo", event.target.value );
                redirect( `${pathname}?${params.toString()}`, RedirectType.push );
              }}
            />
          </div>
        </div>
        <div className={"flex flex-row justify-end w-full pb-2 border-b-[1px] border-primary items-center"}>
          <p className={"mr-1"}>Sort by: </p>
          <Select onValueChange={( value ) =>
          {
            params.set( "sortBy", value );
            redirect( `${pathname}?${params.toString()}`, RedirectType.push );
          }}>
            <SelectTrigger className={"w-[180px] border-primary"}>
              <SelectValue placeholder={sortBy?.name ?? "Random v0.-1"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SortOptions.options.map( ( option: SortOptions, i: number ) => (
                  <SelectItem value={option.key} key={i}>{option.name}</SelectItem>
                ) )}
              </SelectGroup>
            </SelectContent>
          </Select>
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