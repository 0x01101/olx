import styles from "@/app/ui/css/layout.module.css";
import SearchBar from "@/app/ui/elements/searchbar";
import Categories from "@/app/ui/elements/categories";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";
import { CategoriesSkeleton } from "@/components/skeletons";

export default async function Page (): Promise<JSX.Element>
{
  const categories: Category[] = await db.category.findMany();
  
  return (
    <div data-testid="home-page" id="searchmain-container" className={styles.homePage}>
      <SearchBar />
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories categories={categories} />
      </Suspense>
    </div>
  );
}