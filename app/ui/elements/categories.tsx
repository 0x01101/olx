import styles from "@/app/ui/elements/css/categories.module.css";
import { Category } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default async function Categories (): Promise<JSX.Element>
{
  const categories: Category[] | undefined = await fetchCategories();
  
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div data-testid="home-categories-menu" data-cy="home-categories-menu">
          <h2 data-testid="home-categories-title" data-cy="home-categories-title"
              className={styles.text}>Main Categories</h2>
          <div data-testid="home-categories-menu-row" data-cy="home-categories-menu-row"
               className={styles.categories}>
            {categories?.map( ( c: Category, i: number ) =>
              ( <Link className={styles.category} key={i} data-testid={`cat-${c.id}`} data-cy={`cat-${c.id}`}
                   data-check={c.id} data-path={c.name.toLowerCase()} href={`/${c.name.toLowerCase()}/`}>
                <Image src={`${c.logo_path}`}
                       alt={`${c.name} category image`} className={styles.categoryImage} width={88} height={88} />
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