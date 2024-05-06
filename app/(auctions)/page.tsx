import styles from "@/app/ui/css/layout.module.css";
import SearchBar from "@/app/ui/elements/searchbar";
import Categories from "@/app/ui/elements/categories";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";
import { CategoriesSkeleton } from "@/components/skeletons";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <div className={styles.homePage}>
      <SearchBar />
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
    </div>
  );
}