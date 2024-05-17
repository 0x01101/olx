"use client";

import { FullProduct } from "@/lib/definitions";
import { Cross2Icon, DashIcon, Link1Icon } from "@radix-ui/react-icons";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { PreviewableImage } from "@/components/previewable-image";

interface ProductCardProps
{
  product: FullProduct;
  deleteHandler?: ( { id }: { id: string } ) => void;
}

export function ProductCard ( { product, deleteHandler }: ProductCardProps ): JSX.Element
{
  const [ folded, setFolded ] = useState<boolean>( false );
  
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
                product and remove its data from servers.
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
        </>
      )}
    </div>
  );
}