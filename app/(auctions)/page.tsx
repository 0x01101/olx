import Categories from "@/components/main/categories";
import { Suspense } from "react";
import { CategoriesSkeleton } from "@/components/skeletons";
import { ProductSearchBar } from "@/components/main/product-searchbar";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <div className={"bg-primary overflow-hidden p-0 m-0 relative"}>
      <ProductSearchBar />
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
    </div>
  );
}