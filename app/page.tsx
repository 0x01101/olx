"use server";

import styles from "@/app/ui/index.module.css";
import SearchBar from "@/app/ui/elements/searchbar";
import Categories from "@/app/ui/elements/categories";
import { CategoriesSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <div id={"mainContent"} className={styles.mainContent}>
      <div data-testid="home-page" id="searchmain-container" className={styles.homePage}>
        <SearchBar />
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>
      </div>
    </div>
  );
}