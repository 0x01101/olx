import { Category, Product } from "@/app/lib/definitions";
import { fetchCategoriesByProperty, fetchProductsByProperty } from "@/app/lib/data/sql";
import { notFound } from "next/navigation";
import styles from "@/app/ui/css/category.module.css";

export default async function Page ( { params }: { params: { categoryName: string } } ): Promise<JSX.Element>
{
  const categoryName: string = params.categoryName;
  const category: Category = ( await fetchCategoriesByProperty( "name", categoryName ) )[ 0 ];
  if ( !category ) notFound();
  const products: Product[] = await fetchProductsByProperty( "category_id", category.id );
  
  return (
    <div className={styles.container}>
      <form action={"#"} noValidate data-testid={"listing-filters-form"}>
        {/* TODO: Add an actual search bar */}
        <div className={styles.searchbarPartsContainer}>
          <div className={styles.actualSearchbarContainer}>
            <div data-testid="search-autosuggession" style={{ position: "relative" }}>
              <div data-testid="flyout-wrapper" style={{ position: "relative" }}>
                <div role={"button"} data-testid="flyout-toggle" aria-label={"flyout"}>
                  <div className={styles.idk1}>
                    <div className={styles.actualSearchbarInnerContainer}>
                      <input autoComplete="off" type="text" id="search" data-testid="search-input"
                             data-cy="search-bar-input" placeholder="Search" className={styles.actualSearchbar}
                             aria-describedby="" color="#002F34" aria-invalid="false"
                             aria-labelledby="undefined-label" value="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.miscOptionsContainer}>
          <div className={styles.onlyWithPhoto}>
          
          </div>
        </div>
      </form>
    </div>
);
}