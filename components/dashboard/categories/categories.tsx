"use client";

import { useState } from "react";
import { CategoryCard } from "@/components/dashboard/categories/category-card";
import { FullCategory, ServerResponse } from "@/lib/definitions";
import { deleteCategory } from "@/actions/delete";

interface CategoriesProps
{
  categories: FullCategory[];
}

export function Categories ( { categories: cats }: CategoriesProps ): JSX.Element
{
  const [ categories, setCategories ] = useState<FullCategory[]>( cats );
  
  const deleteCallback = async ( { id }: { id: number } ): Promise<void> =>
  {
    const response: ServerResponse = await deleteCategory( { id } );
    if ( response.success )
      setCategories( categories.filter( ( category: FullCategory ): boolean => category.id !== id ) );
  };
  
  return (
    <div
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      className={"grid w-full h-full items-start gap-4"}
    >
      {categories.map( ( category: FullCategory, index: number ) => (
        <CategoryCard key={index} category={category} deleteHandler={deleteCallback} />
      ) )}
    </div>
  );
}