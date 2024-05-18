"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Cross2Icon, DashIcon, Link1Icon } from "@radix-ui/react-icons";
import { FullCategory } from "@/lib/definitions";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { isEmpty } from "@/lib/arrays";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SimpleCategoryUpdateSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PreviewableImage } from "@/components/previewable-image";
import isEqual from "react-fast-compare";

interface CategoryCardProps
{
  category: FullCategory;
  imageSrc?: string | null;
  onImageUpload?: ( id: number, src: string | null ) => void;
  deleteHandler?: ( category: { id: number } ) => void;
  editHandler?: ( category: z.infer<typeof SimpleCategoryUpdateSchema> & {
    id: number,
    image?: string | null
  } ) => void;
}

export function CategoryCard ( {
  category,
  imageSrc,
  onImageUpload,
  deleteHandler,
  editHandler,
}: CategoryCardProps ): JSX.Element
{
  const [ folded, setFolded ] = useState<boolean>( false );
  const [ changed, setChanged ] = useState<string[]>( [] );
  const [ isPending, startTransition ] = useTransition();
  
  const defaultValues = useMemo( () => ( {
    name: category.name,
  } ), [ category ] );
  
  const form = useForm<z.infer<typeof SimpleCategoryUpdateSchema>>( {
    resolver: zodResolver( SimpleCategoryUpdateSchema ),
    defaultValues,
  } );
  
  const formValues = form.watch();
  
  useEffect( () =>
  {
    const changedFields: string[] = [];
    for ( const key in formValues )
    {
      if ( formValues[ key as keyof typeof formValues ] !== defaultValues[ key as keyof typeof defaultValues ] )
      {
        changedFields.push( key );
      }
    }
    if ( !isEqual( changedFields, changed ) ) setChanged( changedFields );
  }, [ formValues, defaultValues, changed ] );
  
  const onUpload = useCallback( ( event: React.ChangeEvent<HTMLInputElement> ): void =>
  {
    const file: File | undefined = event.target.files?.[ 0 ];
    
    if ( file )
    {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL( file );
      reader.onload = (): void =>
      {
        const result: string | ArrayBuffer | null = reader.result;
        if ( result && onImageUpload )
        {
          onImageUpload( category.id, result as string );
        }
      };
    }
  }, [ category.id, onImageUpload ] );
  
  const onSubmit = async ( values: z.infer<typeof SimpleCategoryUpdateSchema> ): Promise<void> =>
  {
    startTransition( async (): Promise<void> =>
    {
      if ( editHandler !== undefined ) editHandler( {
        ...values,
        id:    category.id,
        image: imageSrc,
      } );
    } );
  };
  
  return (
    <div className={"bg-popover rounded-md p-2 flex flex-col w-[225px] shadow-md items-center space-y-2"}>
      <div className={"flex flex-row-reverse mb-1 w-full"}>
        {
          deleteHandler !== undefined && ( isEmpty( category.Product ) ?
            <Cross2Icon
              className={"w-5 h-5 bg-red-600 text-red-600 hover:text-white transition-all rounded-full cursor-pointer ml-1"}
              onClick={() => deleteHandler( category )}
            /> :
            ( <AlertDialog>
              <AlertDialogTrigger asChild>
                <Cross2Icon
                  className={"w-5 h-5 bg-red-600 text-red-600 hover:text-white transition-all rounded-full cursor-pointer ml-1"} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this
                    category and all {category.Product.length} products belonging to it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteHandler( category )}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> ) )
        }
        <DashIcon
          className={"w-5 h-5 bg-orange-600 text-orange-600 hover:text-white transition-all rounded-full cursor-pointer"}
          onClick={() => setFolded( !folded )}
        />
        <div className={"mr-auto"}>
          <Link href={`/${category.name.toLowerCase()}`}>
            <Link1Icon
              className={"w-5 h-5 bg-blue-600 text-blue-600 hover:text-white transition-all rounded-full cursor-pointer"} />
          </Link>
        </div>
      </div>
      {!folded && (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )} className="space-y-1">
              <div className={"flex w-[200px] h-[200px] justify-center items-center rounded-md"}>
                {imageSrc ? (
                  <div className={"relative w-full h-full"}>
                    <Cross2Icon
                      onClick={(): void =>
                      {
                        onImageUpload && onImageUpload( category.id, imageSrc == category.image ? null : category.image );
                      }}
                      className={"absolute top-0 right-0 z-10 bg-gray-400 rounded-full cursor-pointer w-5 h-5"}
                    />
                    <PreviewableImage
                      src={imageSrc}
                      alt={"Image"}
                      width={200}
                      height={200}
                      className={"rounded-md w-[200px] h-[200px]"}
                    />
                  </div>
                ) : (
                  <>
                    <input
                      type={"file"}
                      id={`file-${category.id}`}
                      accept={"image/jpeg"}
                      onChange={onUpload}
                      className={"hidden"}
                    />
                    <label htmlFor={`file-${category.id}`} className="cursor-pointer">
                      Click to upload
                    </label>
                  </>
                )}
              </div>
              <FormField
                control={form.control}
                name={"name"}
                render={( { field } ) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        readOnly={!editHandler}
                        className={changed.includes( field.name ) ? "border-emerald-700" : ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type={"submit"} className={"w-full"} disabled={!editHandler}>
                Save
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}