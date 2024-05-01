import styles from "@/app/ui/css/layout.module.css";
import SearchBar from "@/app/ui/elements/searchbar";
import Categories, { CategoriesFallback } from "@/app/ui/elements/categories";
import { Suspense } from "react";
import MainLayout from "@/app/ui/layouts/mainLayout";

export default function Page (): JSX.Element
{
  return (
    <MainLayout>
      <div data-testid="home-page" id="searchmain-container" className={styles.homePage}>
        <SearchBar />
        <Suspense fallback={<CategoriesFallback />}>
          <Categories />
        </Suspense>
      </div>
    </MainLayout>
  );
}