"use client";

import styles from "@/app/ui/elements/css/categories.module.css";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

interface CategoriesProps
{
  categories: Category[];
}

export default function Categories ( { categories }: CategoriesProps ): JSX.Element
{
  return (
    <div className={""}>
      <div className={styles.innerContainer}>
        <div data-testid="home-categories-menu" data-cy="home-categories-menu">
          <h2 data-testid="home-categories-title" data-cy="home-categories-title"
              className={styles.text}>Main Categories</h2>
          <div data-testid="home-categories-menu-row" data-cy="home-categories-menu-row"
               className={styles.categories}>
            {categories?.map( ( c: Category, i: number ) =>
              ( <Link
                className={styles.category}
                key={i}
                href={`/${c.name.toLowerCase()}/`}
              >
                <Image
                  src={`${c.image || "https://j3rzy.dev/images/Furry.jpg"}`}
                  alt={`${c.name} category image`}
                  className={styles.categoryImage}
                  width={88}
                  height={88}
                />
                <span className={styles.categoryName}>{c.name.trim()}</span>
              </Link> ) )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoriesFallback (): JSX.Element
{
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderOuterContainer}>
        <div className={styles.loader} />
      </div>
    </div>
  );
}