import { notFound } from "next/navigation";
import styles from "@/app/ui/css/category.module.css";
import { capitalize } from "@/lib/text";
import ListingCard from "@/app/ui/elements/categoryName/listingCard";
import WatchSearchButton from "@/app/ui/elements/categoryName/watchSearchButton";
import Image from "next/image";
import MainLayout from "@/app/ui/layouts/mainLayout";
import { Category, Product } from "@prisma/client";
import { db } from "@/lib/db";

export default async function Page ( { params }: { params: { categoryName: string } } ): Promise<JSX.Element>
{
  const categoryName: string = params.categoryName.trim();
  let category: Category | null = await db.category.findUnique( { where: { name: categoryName } } ); // TODO: Make so you can change it via category dropdown
  if ( !category ) notFound();
  const products: Product[] | undefined = await db.product.findMany( { where: { category: category } } );
  if ( !products ) notFound(); // TODO: Change
  
  let withPhotosOnly: boolean = false; // TODO: Add logic to actually change it's value
  let watchingSearch: boolean = false; // TODO: Add logic
  
  return (
    <MainLayout>
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
            <WatchSearchButton initial={watchingSearch} category={category} />
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
                        <Image src={"/app/static/media/dropdownIcon.svg"} alt={"Dropdown icon"} width={22}
                               height={22} />
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
                                   data-testid="range-to-input" placeholder="To"
                                   className={styles.priceRangeFilterInput}
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
    </MainLayout>
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