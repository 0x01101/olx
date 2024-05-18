"use client";

import { Widget } from "@/components/widget";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { UserUpdateSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import isEqual from "react-fast-compare";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cross2Icon, ImageIcon } from "@radix-ui/react-icons";
import { PreviewableImage } from "@/components/previewable-image";
import { isEmpty } from "@/lib/arrays";

export default function Page (): JSX.Element
{
  const { data, update } = useSession();
  
  const [ isPending, startTransition ] = useTransition();
  const [ changed, setChanged ] = useState<string[]>( [] );
  
  const defaultValues = useMemo( () => ( {
    // THESE KEYS CAN'T POSSIBLY BE NULL / UNDEFINED IN THIS APP
    // (unless it's going to be manually set to null in the database, which is dumb an WILL break the app)
    name:               data!.user!.name!,
    email:              data!.user!.email!,
    image:              data!.user!.image ?? undefined,
    isTwoFactorEnabled: data!.user!.isTwoFactorEnabled,
  } ), [ data ] );
  
  const form = useForm<z.infer<typeof UserUpdateSchema>>( {
    resolver: zodResolver( UserUpdateSchema ),
    defaultValues,
  } );
  
  const formValues = form.watch();
  
  useEffect( () =>
  {
    const changedFields: string[] = [];
    
    for ( const key in formValues )
      if ( formValues[ key as keyof typeof formValues ] !== defaultValues[ key as keyof typeof defaultValues ] )
        changedFields.push( key );
    
    if ( !isEqual( changed, changedFields ) )
      setChanged( changedFields );
  }, [ formValues, defaultValues, changed ] );
  
  const onSubmit = async ( values: z.infer<typeof UserUpdateSchema> ): Promise<void> =>
  {
    // TODO: CHECK IF EMAIL IS ALREADY BEING USED AND VERIFY IT
    startTransition( async (): Promise<void> =>
    {
      await update( values );
    } );
  };
  
  return (
    <Widget>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit( onSubmit )}
          className={"flex flex-col space-y-2 justify-center"}
        >
          <div className={"flex flex-row space-x-4 items-center"}>
            <div className={"h-[225px] w-[225px] flex justify-center items-center"}>
              {form.getValues().image ? (
                <div className={"relative w-full h-full"}>
                  <Cross2Icon
                    onClick={(): void =>
                    {
                      form.setValue( "image", undefined );
                    }}
                    className={"absolute top-0 right-0 z-10 bg-gray-400 rounded-full cursor-pointer w-5 h-5"}
                  />
                  <PreviewableImage
                    src={form.getValues().image!}
                    alt={"Image"}
                    width={225}
                    height={225}
                    className={"rounded-md w-[225px] h-[225px]"}
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name={"image"}
                  render={( { field } ) => (
                    <FormItem>
                      <label htmlFor={"file"} className="cursor-pointer">
                        <ImageIcon className={"w-10 h-10"} />
                      </label>
                      <FormControl>
                        <input
                          {...field}
                          type={"file"}
                          id={"file"}
                          accept={"image/jpeg"}
                          className={"hidden"}
                          onChange={( event ) =>
                          {
                            const file: File | undefined = event.target.files?.[ 0 ];
                            
                            if ( file )
                            {
                              const reader: FileReader = new FileReader();
                              reader.readAsDataURL( file );
                              reader.onload = (): void =>
                              {
                                const result: string | ArrayBuffer | null = reader.result;
                                if ( result )
                                {
                                  field.onChange( result as string );
                                }
                              };
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <span className={"border-[1px] border-primary h-[225px]"} />
            <div className={"flex flex-col space-y-4"}>
              <FormField
                control={form.control}
                name={"name"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"Name"}
                        className={
                          changed.includes( field.name ) ? "border-emerald-700 focus-visible:ring-emerald-700" : "border-primary"
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"email"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"E-Mail"}
                        className={
                          changed.includes( field.name ) ? "border-emerald-700 focus-visible:ring-emerald-700" : "border-primary"
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"isTwoFactorEnabled"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>2FA Enabled</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={( value ) => field.onChange( value === "1" )}
                        defaultValue={field.value ? "1" : "0"}
                      >
                        <SelectTrigger
                          className={changed.includes( field.name ) ? "border-emerald-700 focus-visible:ring-emerald-700" : "border-primary"}>
                          <SelectValue placeholder={"2FA Enabled"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"1"}>
                              Enabled
                            </SelectItem>
                            <SelectItem value={"0"}>
                              Disabled
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <span className={"border-[1px] border-primary w-[225px]"} />
          {!isEmpty( changed ) && (
            <>
              <Button
                className={"w-[225px]"}>
                Save
              </Button>
            </>
          )}
        </form>
      </Form>
    </Widget>
  );
}