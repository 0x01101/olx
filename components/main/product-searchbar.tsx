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
        >
          <FormField
            control={form.control}
            name={"search"}
            render={( { field } ) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Widget>
  );
}