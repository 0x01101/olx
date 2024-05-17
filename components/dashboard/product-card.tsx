"use client";

import { FullProduct } from "@/lib/definitions";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProductCardProps
{
  product: FullProduct;
  deleteHandler?: ( { id }: { id: string } ) => void;
}

export function ProductCard ( { product, deleteHandler }: ProductCardProps ): JSX.Element
{
  return (
    <div className={"bg-popover rounded-md p-2 flex flex-col w-[225px] shadow-md"}>
      <div className={"flex flex-row-reverse"}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Cross2Icon className={"w-5 h-5 bg-red-600 rounded-full cursor-pointer"} />
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
              <AlertDialogAction
                onClick={() => deleteHandler ? deleteHandler( product ) : undefined}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}