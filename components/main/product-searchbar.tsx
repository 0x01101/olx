"use client";

import { Widget } from "@/components/widget";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { ReadonlyURLSearchParams, redirect, RedirectType, usePathname, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProductSearchBar (): JSX.Element
{
  const pathname: string = usePathname();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const params: URLSearchParams = new URLSearchParams( searchParams.toString() );
  
  const [ isPending, startTransition ] = useTransition();
  
  const form = useForm<z.infer<typeof SearchSchema>>( {
    resolver:      zodResolver( SearchSchema ),
    defaultValues: {
      search: params.get( "search" ) ?? "",
    },
  } );
  
  const onSubmit = async ( { search }: z.infer<typeof SearchSchema> ): Promise<void> =>
  {
    startTransition( async (): Promise<void> =>
    {
      if ( search ) params.set( "search", search.trim() );
      else params.delete( "search" );
      redirect( `${pathname == "/" ? "/offers" : pathname}?${params.toString()}`, RedirectType.push );
    } );
  };
  
  return (
    <Widget>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit( onSubmit )}
          className={"flex flex-row justify-center"}
        >
          <FormField
            control={form.control}
            name={"search"}
            render={( { field } ) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={""}
                    className={`bg-primary rounded-r-none h-10 w-[50vw]`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className={"rounded-l-none h-10"}>Search</Button>
        </form>
      </Form>
    </Widget>
  );
}