"use client";

import { Widget } from "@/components/widget";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { ListingAddSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { capitalize } from "@/lib/text";
import { Button } from "@/components/ui/button";
import { isEmpty, removeDupes } from "@/lib/arrays";
import { PreviewableImage } from "@/components/previewable-image";
import { ServerResponse } from "@/lib/definitions";
import { addListing } from "@/actions/add-listing";
import { Category } from "@prisma/client";
import { getCategories } from "@/actions/fetch";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FormSuccess } from "@/components/form-success";
import { convertFileToBase64 } from "@/lib/file";

export function ListingAddForm (): JSX.Element
{
  const [ error, setError ] = useState<string | undefined>( "" );
  const [ success, setSuccess ] = useState<string | undefined>( "" );
  const [ imageSources, setImageSources ] = useState<( string | ArrayBuffer )[]>( [] );
  const [ images, setImages ] = useState<File[]>( [] );
  
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
  
  const [ isPending, startTransition ] = useTransition();
  
  const form = useForm<z.infer<typeof ListingAddSchema>>( {
    resolver:      zodResolver( ListingAddSchema ),
    defaultValues: {
      state: "USED",
    },
  } );
  
  const onSubmit = async ( values: z.infer<typeof ListingAddSchema> ): Promise<void> =>
  {
    setError( "" );
    setSuccess( "" );
    
    startTransition( async (): Promise<void> =>
    {
      const base64Images: string[] = await Promise.all(images.map(convertFileToBase64));
      const response: ServerResponse = await addListing( values, base64Images );
      setError( response?.error );
      setSuccess( response?.success );
    } );
  };
  
  const onUpload = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof ListingAddSchema>, "images">,
  ): void =>
  {
    field.onChange( e );
    const files: FileList | null = e.target.files;
    if ( !files ) return;
    const srcs: ( string | ArrayBuffer )[] = [];
    const fileObjs: File[] = [];
    
    const loadNextFile = ( index: number ): void =>
    {
      if ( index >= files.length )
      {
        const combinedSources: ( string | ArrayBuffer )[] = [ ...imageSources, ...srcs ];
        const combinedFiles: File[] = [ ...images, ...fileObjs ];
        setImageSources( removeDupes<string | ArrayBuffer>( combinedSources ) );
        setImages( removeDupes<File>( combinedFiles ) );
        return;
      }
      
      const file: File | null = files[ index ];
      if ( !file )
      {
        loadNextFile( index + 1 );
        return;
      }
      
      const reader: FileReader = new FileReader();
      reader.readAsDataURL( file );
      reader.onload = (): void =>
      {
        const result: string | ArrayBuffer | null = reader.result;
        if ( result )
        {
          srcs.push( result );
          fileObjs.push( file );
        }
        loadNextFile( index + 1 );
      };
    };
    
    loadNextFile( 0 );
  };
  
  const deleteImage = ( index: number ): void =>
  {
    const updatedSrc: ( string | ArrayBuffer )[] = imageSources.filter( ( _: string | ArrayBuffer, i: number ): boolean => i !== index );
    const updatedFiles: File[] = images.filter( ( _: File, i: number ): boolean => i !== index );
    setImageSources( updatedSrc );
    setImages( updatedFiles );
    if ( isEmpty( updatedSrc ) ) ( document.getElementById( "file" ) as HTMLInputElement ).value = "";
  };
  
  return (
    <Widget>
      <Form {...form}>
        <form onSubmit={form.handleSubmit( onSubmit )}>
          <div className={"flex flex-row w-full"}>
            <div className={"flex flex-col space-y-5 w-[50%] items-center p-2"}>
              <Card className={"w-full"}>
                <CardContent className={"p-3 flex flex-col space-y-3"}>
                  <h3>Info</h3>
                  <span className={"w-full border-[1px] border-primary"} />
                  <div className={"flex flex-col space-y-3"}>
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
                              placeholder={"Name"}
                            />
                          </FormControl>
                          <FormMessage />
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
                              placeholder={"Description"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className={"w-full flex flex-row space-x-5"}>
                      <FormField
                        control={form.control}
                        name={"price"}
                        render={( { field } ) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder={"69420"}
                                type={"number"}
                              />
                            </FormControl>
                            <FormMessage />
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
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className={"w-[180px] border-primary"}>
                                  <SelectValue placeholder={"State"} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value={"USED"}>Used</SelectItem>
                                    <SelectItem value={"NEW"}>New</SelectItem>
                                    <SelectItem value={"BROKEN"}>Broken</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={"category"}
                        render={( { field } ) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className={"w-[180px] border-primary"}>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className={"flex flex-col space-y-5 w-[50%] items-center p-2"}>
              <Card className={"w-full"}>
                <CardContent className={"p-3 flex flex-col space-y-3"}>
                  <div className={"flex justify-between"}>
                    <h3>Images</h3>
                    <p>{imageSources.length} chosen</p>
                  </div>
                  <span className={"w-full border-[1px] border-primary"} />
                  <div className={"flex flex-col space-y-3"}>
                    {!isEmpty( imageSources ) && (
                      <>
                        <div className={"flex flex-row w-full"}>
                          {imageSources.map( ( src: string | ArrayBuffer, index: number ) => (
                            <div key={index} className={"relative"}>
                              <Cross2Icon
                                className={"absolute top-0 right-0 z-10 bg-gray-400 rounded-full cursor-pointer"}
                                onClick={() => deleteImage( index )}
                              />
                              <PreviewableImage
                                src={src as string}
                                alt={"Image"}
                                className={"object-cover"}
                                width={100}
                                height={100}
                              />
                            </div>
                          ) )}
                        </div>
                        <span className={"w-full border-[1px] border-primary"} />
                      </>
                    )}
                    <FormField
                      control={form.control}
                      name={"images"}
                      render={( { field } ) => (
                        <FormItem>
                          <input
                            type={"file"}
                            id={"file"}
                            accept={"image/jpeg"}
                            multiple
                            onChange={( event ) => onUpload( event, field )}
                            className={"hidden"}
                          />
                          <label
                            htmlFor={"file"}
                            className={"inline-block cursor-pointer border-primary border-[1px] p-2 w-full text-center"}
                          >
                            Choose file
                          </label>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className={"w-full mt-auto"}>
                <CardContent className={"p-3 flex flex-col space-y-3"}>
                  <FormSuccess message={success} />
                  <FormMessage>{error}</FormMessage>
                  <Button
                    disabled={isPending}
                    type={"submit"}
                    className={"w-full"}
                  >
                    Submit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </Widget>
  );
}