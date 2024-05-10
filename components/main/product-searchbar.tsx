"use client";

import { Widget } from "@/components/main/widget";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProductSearchBar (): JSX.Element
{
  const router: AppRouterInstance = useRouter();
  
  const [ isPending, startTransition ] = useTransition();
  
  const form = useForm<z.infer<typeof SearchSchema>>( {
    resolver:      zodResolver( SearchSchema ),
    defaultValues: {
      search: "",
    },
  } );
  
  const onSubmit = async ( { search }: z.infer<typeof SearchSchema> ): Promise<void> =>
  {
    startTransition( async (): Promise<void> =>
    {
      router.push( `/offers/q-${search.trim().toLowerCase().replace( /\s+/img, "-" )}` );
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