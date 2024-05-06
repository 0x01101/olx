import styles from "@/app/ui/css/layout.module.css";
import SearchBar from "@/app/ui/elements/searchbar";
import Categories, { CategoriesFallback } from "@/app/ui/elements/categories";
import { Suspense } from "react";
import Layout from "@/app/(auctions)/layout";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export default async function Page (): Promise<JSX.Element>
{
  const categories: Category[] = await db.category.findMany();
  
  return (
    <Layout>
      <div data-testid="home-page" id="searchmain-container" className={styles.homePage}>
        <SearchBar />
        <Suspense fallback={<CategoriesFallback />}>
          <Categories categories={categories} />
        </Suspense>
      </div>
    </Layout>
  );
}