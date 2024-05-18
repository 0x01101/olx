"use client";

import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { SimpleCategoryUpdateSchema } from "@/schemas";
import { DialogHeader } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { PreviewableImage } from "@/components/previewable-image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CategoryCreateCardProps
{
  createHandler?: ( category: z.infer<typeof SimpleCategoryUpdateSchema> & {
    image?: string | null
  } ) => void;
}

export function CategoryCreateCard ( { createHandler }: CategoryCreateCardProps ): JSX.Element
{
  const [ image, setImage ] = useState<string | null>( null );
  const [ isPending, startTransition ] = useTransition();
  
  const form = useForm<z.infer<typeof SimpleCategoryUpdateSchema>>( {
    resolver: zodResolver( SimpleCategoryUpdateSchema ),
  } );
  
  const onSubmit = async ( values: z.infer<typeof SimpleCategoryUpdateSchema> ) =>
  {
    startTransition( () =>
    {
      if ( createHandler ) createHandler( { ...values, image } );
    } );
  };
  
  return (
    <div className={"bg-popover rounded-md p-2 flex w-[225px] shadow-md items-center justify-center self-stretch"}>
      <Dialog>
        <DialogTrigger asChild>
          <div className={"flex w-[150px] h-[150px] bg-emerald-600 rounded-3xl items-center justify-center"}>
            <PlusIcon className={"w-16 h-16"} />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create category</DialogTitle>
          </DialogHeader>
          <div className={"flex flex-row space-x-3"}>
            <div className={"relative w-[200px] h-[200px] flex justify-center items-center"}>
              {image ? (
                <>
                  <Cross2Icon
                    onClick={(): void =>
                    {
                      setImage( null );
                    }}
                    className={"absolute top-0 right-0 z-10 bg-gray-400 rounded-full cursor-pointer w-5 h-5"}
                  />
                  <PreviewableImage
                    src={image}
                    alt={"Image"}
                    width={200}
                    height={200}
                    className={"rounded-md w-[200px] h-[200px]"}
                  />
                </>
              ) : (
                <>
                  <input
                    type={"file"}
                    id={"file"}
                    accept={"image/jpeg"}
                    onChange={( event ) =>
                    {
                      const file: File | undefined = event.target.files?.[ 0 ];
                      if ( file )
                      {
                        const reader: FileReader = new FileReader();
                        reader.onload = ( e ) =>
                        {
                          setImage( e.target?.result as string );
                        };
                        reader.readAsDataURL( file );
                      }
                    }}
                    className={"hidden"}
                  />
                  <label htmlFor={"file"} className="cursor-pointer">
                    Click to upload image
                  </label>
                </>
              )}
            </div>
            <span className={"border-2 border-primary"} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit( onSubmit )}
                className={"flex flex-col space-y-2"}
              >
                <FormField
                  control={form.control}
                  name={"name"}
                  render={( { field } ) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={"Category 69"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className={"flex-grow"} />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type={"submit"} className={"w-full"}>
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}