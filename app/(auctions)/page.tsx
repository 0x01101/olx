import SearchBar from "@/app/ui/elements/searchbar";
import Categories from "@/app/ui/elements/categories";
import { Suspense } from "react";
import { CategoriesSkeleton } from "@/components/skeletons";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <div className={"bg-primary overflow-hidden p-0 m-0 relative"}>
      <SearchBar />
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
    </div>
  );
}