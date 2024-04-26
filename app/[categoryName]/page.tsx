import { Category, Product } from "@/app/lib/definitions";
import { fetchCategoriesByProperty, fetchProductsByProperty } from "@/app/lib/data/sql";
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
          <button type={"button"} data-testid="fav-search-btn" className={styles.watchSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                 className={styles.watchSearchIcon}>
              <path fill="currentColor" fillRule="evenodd"
                    d="M20.219 10.367 12 20.419 3.806 10.4A3.96 3.96 0 0 1 3 8c0-2.206 1.795-4 4-4a4.004 4.004 0 0 1 3.868 3h2.264A4.003 4.003 0 0 1 17 4c2.206 0 4 1.794 4 4 0 .868-.279 1.698-.781 2.367M17 2a5.999 5.999 0 0 0-5 2.686A5.999 5.999 0 0 0 7 2C3.692 2 1 4.691 1 8a5.97 5.97 0 0 0 1.232 3.633L10.71 22h2.582l8.501-10.399A5.943 5.943 0 0 0 23 8c0-3.309-2.692-6-6-6"></path>
            </svg>
            Watch Search
          </button>
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