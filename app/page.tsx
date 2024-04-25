import styles from "@/app/ui/index.module.css";
import SearchBar from "@/app/ui/elements/searchbar";
import Categories, { CategoriesFallback } from "@/app/ui/elements/categories";
import { Suspense } from "react";

export default function Page (): JSX.Element
{
  return (
    <div id={"mainContent"} className={styles.mainContent}>
      <div data-testid="home-page" id="searchmain-container" className={styles.homePage}>
        <SearchBar />
        <Suspense fallback={<CategoriesFallback />}>
          <Categories />
        </Suspense>
      </div>
    </div>
  );
}