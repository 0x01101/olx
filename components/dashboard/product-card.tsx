"use client";

import { Category, Images, Product, User } from "@prisma/client";

interface ProductCardProps
{
  product: Product & { seller: User, category: Category, images: Images[] };
}

export function ProductCard ( { product }: ProductCardProps ): JSX.Element
{
  return (
    <div className="w-full h-full bg-primary rounded-md p-2">
      <p className="font-bold text-2xl text-center">Product Card</p>
    </div>
  );
}