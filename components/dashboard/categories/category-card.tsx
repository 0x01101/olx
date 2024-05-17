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
import { Cross2Icon, Link1Icon } from "@radix-ui/react-icons";
import { FullCategory } from "@/lib/definitions";
import Link from "next/link";

interface CategoryCardProps
{
  category: FullCategory;
  deleteHandler?: ( category: { id: number } ) => void;
}

export function CategoryCard ( { category, deleteHandler }: CategoryCardProps ): JSX.Element
{
  return (
    <div className={"bg-popover rounded-md p-2 flex flex-col w-[225px] shadow-md items-center space-y-2"}>
      <div className={"flex flex-row-reverse mb-1 w-full"}>
        {deleteHandler !== undefined && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Cross2Icon className={"w-5 h-5 bg-red-600 rounded-full cursor-pointer ml-1"} />
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
                <AlertDialogAction onClick={() => deleteHandler(category)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <div className="mr-auto">
          <Link href={`/${category.name.toLowerCase()}`}>
            <Link1Icon className={"w-5 h-5 bg-blue-600 rounded-full cursor-pointer"} />
          </Link>
        </div>
      </div>
      <div className={"flex w-[200px] h-[200px] justify-center items-center"}>
        {category.image ?(<>
        </>) : (<>
          No Image
        </>)}
      </div>
      {category.name}
    </div>
  );
}