import { Category, Product } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import styles from "@/app/ui/css/category.module.css";
import { capitalize } from "@/app/lib/text";
import { fetchCategoryByName, fetchProductsInCategory } from "@/app/lib/data/fetch";
import ListingCard from "@/app/ui/elements/categoryName/listingCard";
import { revalidatePath } from "next/cache";
import WatchCategoryButton from "@/app/ui/elements/categoryName/watchCategoryButton";

export default async function Page ( { params }: { params: { categoryName: string } } ): Promise<JSX.Element>
{
  let withPhotosOnly: boolean = false; // TODO: Add logic to actually change it's value
  let watchingSearch: boolean = false; // TODO: Add logic
  
  const categoryName: string = params.categoryName.trim();
  let category: Category = await fetchCategoryByName( categoryName ); // TODO: Make so you can change it via category dropdown
  if ( !category ) notFound();
  const products: Product[] = await fetchProductsInCategory( category );
  
  const handle = async () =>
  {
    "use server";
    watchingSearch = true;
  };
  
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
          <MiscOption name={"photos"} text={"With photos only"} checked={withPhotosOnly} />
          <WatchCategoryButton watching={watchingSearch} callback={handle} />
        </div>
        <div data-testid="listing-filters" className={styles.filtersContainer}>
          <h4 className={styles.filtersTitle}>Filters</h4>
          <div className={styles.filtersMainContainer}>
            <div className={styles.filtersMainInnerContainer}>
              <div className={styles.categoryFilterOuterContainer}>
                <div className={styles.categoryFilterContainer}>
                  <p className={styles.categoryFilterTitle}>Category</p>
                  <div style={{ position: "relative" }}>
                    <div data-cy="category-dropdown" data-testid="category-dropdown"
                         className={styles.categoryFilterInnerContainer}>
                      <div className={styles.categoryFilterSelectedText}>
                        {capitalize( category.name )}
                      </div>
                      <DropdownIcon />
                    </div>
                    {/* <div></div> TODO: Dropdown menu here */}
                  </div>
                </div>
              </div>
              <div className={styles.priceRangeFilterContainer}>
                <p className={styles.priceRangeFilterTitle}>Price</p>
                <div className={styles.priceRangeFilterInnerContainer}>
                  <div>
                    <div data-testid="flyout-wrapper" style={{ position: "relative" }}>
                      <div role={"button"} data-testid="flyout-toggle" aria-label="toggle flyout">
                        <div className={styles.priceRangeFilterInputContainer}>
                          <input autoComplete="off" type="tel" inputMode="numeric" pattern="\d*"
                                 data-testid="range-from-input" placeholder="From"
                                 className={styles.priceRangeFilterInput}
                                 name="range-from-input"
                                 color="#002F34" aria-invalid="false"
                                 aria-labelledby="range-from-input-label" value={""} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div data-testid="flyout-wrapper" style={{ position: "relative" }}>
                      <div role={"button"} data-testid="flyout-toggle" aria-label="toggle flyout">
                        <div className={styles.priceRangeFilterInputContainer}>
                          <input autoComplete="off" type="tel" inputMode="numeric" pattern="\d*"
                                 data-testid="range-to-input" placeholder="To" className={styles.priceRangeFilterInput}
                                 name="range-to-input"
                                 color="#002F34" aria-invalid="false"
                                 aria-labelledby="range-to-input-label" value={""} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TODO: Add rest of the filters & make current ones work */}
        <div className={styles.listingsOuterContainer}>
          <div className={styles.listingsGridContainer} style={{ width: "100%" }}>
            <div className={styles.listingsGrid}>
              {products.map( ( p: Product, i: number ): JSX.Element => ( <ListingCard key={i} product={p} /> ) )}
            </div>
          </div>
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
        <input name={name} data-testid="checkbox-field" id={name} type="checkbox" />
      </label>
      <label htmlFor={"photos"} className={styles.miscOptionTextLabel}>{text}</label>
    </div>
  );
}

function DropdownIcon (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
         className={styles.dropdownIcon}>
      <path fill="currentColor" fillRule="evenodd"
            d="M2.001 6.5h1.414l1.27 1.271 7.316 7.315 7.315-7.315L20.587 6.5h1.414v1.414l-1.27 1.27-7.316 7.316-1 1h-.827l-3.942-3.942-4.374-4.374-1.27-1.27z"></path>
    </svg>
  );
}