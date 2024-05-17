"use client";

import { FullProduct } from "@/lib/definitions";
import { Cross2Icon, DashIcon, Link1Icon, PlusIcon } from "@radix-ui/react-icons";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { PreviewableImage } from "@/components/previewable-image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SimpleListingUpdateSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Category, User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { capitalize } from "@/lib/text";
import { UserAvatar } from "@/components/auth/user-avatar";
import { Button } from "@/components/ui/button";
import { isEmpty } from "@/lib/arrays";
import isEqual from "react-fast-compare";
import { cn } from "@/lib/utils";

interface ProductCardProps
{
  product: FullProduct;
  categories?: Category[];
  users?: User[];
  deleteHandler?: ( product: { id: string } ) => void;
  editHandler?: ( product: z.infer<typeof SimpleListingUpdateSchema> & { id: string } ) => void;
}

export function ProductCard ( {
  product,
  deleteHandler,
  categories,
  users,
  editHandler,
}: ProductCardProps ): JSX.Element
{
  const [ folded, setFolded ] = useState<boolean>( false );
  const [ isPending, startTransition ] = useTransition();
  const [ changed, setChanged ] = useState<string[]>( [] );
  
  const defaultValues = useMemo( () => ( {
    name:        product.name,
    price:       `${product.price}`,
    description: product.description,
    state:       product.state,
    category:    `${product.category_id}`,
    seller_id:   product.seller_id,
  } ), [ product ] );
  
  const form = useForm<z.infer<typeof SimpleListingUpdateSchema>>( {
    resolver:      zodResolver( SimpleListingUpdateSchema ),
    defaultValues: defaultValues,
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
  
  const onSubmit = async ( values: z.infer<typeof SimpleListingUpdateSchema> ): Promise<void> =>
  {
    startTransition( async (): Promise<void> =>
    {
      if ( editHandler !== undefined ) editHandler( { ...values, id: product.id } );
    } );
  };
  
  return (
    <div className={"bg-popover rounded-md p-2 flex flex-col w-[225px] shadow-md items-center space-y-2"}>
      <div className={"flex flex-row-reverse mb-1 w-full"}>
        {deleteHandler !== undefined && ( <AlertDialog>
          <AlertDialogTrigger asChild>
            <Cross2Icon className={"w-5 h-5 bg-red-600 rounded-full cursor-pointer ml-1"} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                product and remove its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteHandler( product )}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> )}
        <DashIcon
          className={"w-5 h-5 bg-orange-600 rounded-full cursor-pointer"}
          onClick={() => setFolded( !folded )}
        />
        <div className="mr-auto">
          <Link href={`/offer/${product.id}`}>
            <Link1Icon className={"w-5 h-5 bg-blue-600 rounded-full cursor-pointer"} />
          </Link>
        </div>
      </div>
      {!folded && (
        <>
          <PreviewableImage
            src={product.image}
            alt={`${product.name}'s Image'`}
            width={200}
            height={200}
            className={"rounded"}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit( onSubmit )}
              className={"space-y-1"}
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
                        readOnly={editHandler === undefined}
                        className={changed.includes( field.name ) ? "border-emerald-700" : ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"price"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={"number"}
                        disabled={isPending}
                        readOnly={editHandler === undefined}
                        className={changed.includes( field.name ) ? "border-emerald-700" : ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"description"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        readOnly={editHandler === undefined}
                        className={changed.includes( field.name ) ? "border-emerald-700" : ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"state"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={editHandler === undefined}
                      >
                        <SelectTrigger className={changed.includes( field.name ) ? "border-emerald-700" : ""}>
                          <SelectValue placeholder={"State"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[ "NEW", "USED", "BROKEN" ].map( ( state: string, index: number ) => (
                              <SelectItem key={index} value={state}>
                                {capitalize( state )}
                              </SelectItem>
                            ) )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {categories !== undefined && (
                <FormField
                  control={form.control}
                  name={"category"}
                  render={( { field } ) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={editHandler === undefined}
                        >
                          <SelectTrigger className={changed.includes( field.name ) ? "border-emerald-700" : ""}>
                            <SelectValue placeholder={"Category"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categories.map( ( category: Category ) => (
                                <SelectItem key={category.id} value={`${category.id}`}>
                                  {capitalize( category.name )}
                                </SelectItem>
                              ) )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {users !== undefined && (
                <FormField
                  control={form.control}
                  name={"seller_id"}
                  render={( { field } ) => (
                    <FormItem>
                      <FormLabel>Seller</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={editHandler === undefined}
                        >
                          <SelectTrigger
                            className={cn( "h-[50px]", changed.includes( field.name ) ? "border-emerald-700" : "" )}
                          >
                            {/* Yes, it should be "User", not "Seller" */}
                            <SelectValue placeholder={"User"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {users.map( ( user: User, index ) => (
                                <SelectItem key={index} value={user.id}>
                                  <div className={"flex flex-row space-x-2"}>
                                    <UserAvatar user={user} />
                                    <div className={"flex flex-col text-xs justify-center"}>
                                      <p className={"font-bold"}>{user.name}</p>
                                      <p>{user.email}</p>
                                    </div>
                                  </div>
                                </SelectItem>
                              ) )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!isEmpty( changed ) && (
                <Button
                  type={"submit"}
                  className={"w-full"}
                  disabled={editHandler === undefined}
                >
                  Save
                </Button>
              )}
            </form>
          </Form>
        </>
      )}
    </div>
  );
}

export function ProductCreateCard (): JSX.Element
{
  return (
    <div className={"bg-popover rounded-md p-2 flex w-[225px] shadow-md items-center justify-center self-stretch"}>
      <Link href={"/offer/create"}>
        <div className={"flex w-[150px] h-[150px] bg-emerald-600 rounded-3xl items-center justify-center"}>
          <PlusIcon className={"w-16 h-16"} />
        </div>
      </Link>
    </div>
  )
}