"use client";

import { useState } from "react";
import { CategoryCard } from "@/components/dashboard/categories/category-card";
import { FullCategory, ServerResponse } from "@/lib/definitions";
import { deleteCategory } from "@/actions/delete";
import { z } from "zod";
import { Admin_CategoryUpdateSchema } from "@/schemas";
import { updateCategory } from "@/actions/update";
import { CategoryCreateCard } from "@/components/dashboard/categories/category-create-card";
import { addCategory } from "@/actions/add-category";

interface CategoriesProps
{
  categories: FullCategory[];
}

export function Categories ( { categories: cats }: CategoriesProps ): JSX.Element
{
  const [ categories, setCategories ] = useState<FullCategory[]>( cats );
  const [ images, setImages ] = useState<Record<number, string | null>>( {
    ...cats.reduce( ( acc: Record<number, string | null>, category: FullCategory ): Record<number, string | null> =>
    {
      acc[ category.id ] = category.image;
      return acc;
    }, {} ),
  } );
  
  const handleImageUpload = ( id: number, src: string | null ) =>
  {
    setImages( ( prev ) => ( { ...prev, [ id ]: src } ) );
  };
  
  const deleteCallback = async ( { id }: { id: number } ): Promise<void> =>
  {
    const response: ServerResponse = await deleteCategory( { id } );
    if ( response.success )
      setCategories( categories.filter( ( category: FullCategory ): boolean => category.id !== id ) );
  };
  
  const updateCallback = async ( category: z.infer<typeof Admin_CategoryUpdateSchema> & {
    id: number
    image?: string | null
  } ): Promise<void> =>
  {
    const { updated }: ServerResponse & { updated?: FullCategory } = await updateCategory( category );
    if ( updated )
      setCategories( categories.map( ( c: FullCategory ): FullCategory => c.id === category.id ? updated : c ) );
  };
  
  const createCallback = async ( category: z.infer<typeof Admin_CategoryUpdateSchema> & {
    image?: string | null
  } ): Promise<void> =>
  {
    const response: ServerResponse & { category?: FullCategory } = await addCategory( category );
    if ( response.category )
    {
      setCategories( [ ...categories, response.category ] );
      setImages( prev => ( {
        ...prev,
        ...( response.category ? ( { [ response.category.id ]: response.category.image } ) : ( {} ) ), // To get rid of WebStorm crying about TS18048: `response.category` is possibly `undefined`
      } ) );
    }
  };
  
  return (
    <div
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      className={"grid w-full h-full items-start gap-4"}
    >
      {categories.map( ( category: FullCategory ) => (
        <CategoryCard
          key={category.id}
          category={category}
          imageSrc={images[ category.id ]}
          onImageUpload={handleImageUpload}
          deleteHandler={deleteCallback}
          editHandler={updateCallback}
        />
      ) )}
      <CategoryCreateCard createHandler={createCallback} />
    </div>
  );
}