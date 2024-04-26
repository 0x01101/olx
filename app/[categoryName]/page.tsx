import { Category, Product } from "@/app/lib/definitions";
import { fetchCategoriesByProperty, fetchNotifications, fetchProductsByProperty } from "@/app/lib/data/sql";
import { notFound } from "next/navigation";
import styles from "@/app/ui/css/category.module.css";

export default async function Page ( { params }: { params: { categoryName: string } } ): Promise<JSX.Element>
{
  const withPhotosOnly: boolean = false; // TODO: Add logic to actually change it's value
  
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
          <MiscOption name={"photos"} text={"With photos only"} checked={withPhotosOnly}/>
          <button type={"button"} data-testid="fav-search-btn" className={styles.watchSearch}></button>
        </div>
      </form>
    </div>
  );
}

function MiscOption ( { name, text, checked }: { name: string, text: string, checked: boolean } ): JSX.Element
{
  return (
    <div className={styles.miscOption}>
      <label data-testid="label" className={styles.miscOptionCheckboxLabel}>
        <div
          className={checked ? styles.miscOptionCheckboxContainerChecked : styles.miscOptionCheckboxContainerUnchecked}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" data-testid="tick"
               className={styles.miscOptionCheckboxIcon}
               style={checked ? { fillOpacity: 1 } : { fillOpacity: 0 }}>
            <path fill="currentColor" fillRule="evenodd"
                  d="m20.586 5-1.271 1.296L8 17.836l-3.315-3.38-1.271-1.297H2v1.443l1.271 1.296L7.293 20h1.414L20.73 7.738 22 6.442V5z"></path>
          </svg>
        </div>
        <input name={name} data-testid="checkbox-field" id={name} type="checkbox"/>
      </label>
      <label htmlFor={"photos"} className={styles.miscOptionTextLabel}>{text}</label>
    </div>
  );
}