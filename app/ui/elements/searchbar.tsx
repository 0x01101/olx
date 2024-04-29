"use client";

import styles from "@/app/ui/elements/css/searchbar.module.css";
import { useRouter } from "next/navigation";
import React from "react";

export default function SearchBar (): JSX.Element
{
  const router = useRouter();
  
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) =>
  {
    event.preventDefault();
    const searchInput = ( event.target as HTMLFormElement ).elements.namedItem(
      "search",
    ) as HTMLInputElement;
    
    router.push( `/offer/${searchInput.value.replace( /\s/g, "-" )}/` );
  };
  
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBarInnerContainer}>
        <div className={styles.searchBar}>
          <div className={styles.formContainer}>
            <form action={"#"} noValidate data-testid="search-form" onSubmit={handleSubmit}>
              <div className={styles.searchElementsContainer}>
                <div className={styles.searchInputContainer}>
                  <div data-test-id="search-autosuggestions" className={styles.searchInputOuterContainer}>
                    <div data-test-id="flyout-wrapper" className={styles.searchInputInnerContainer}>
                      <div role="wrapper" data-test-id="flyout-toggle" aria-label="toggle flyout">
                        <div className={styles.actualSearchBarContainer}>
                          <div className={styles.searchIconContainer}>
                            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                 id="search-icon" className={styles.searchIcon}>
                              <path
                                d="M10.5 17A6.508 6.508 0 0 1 4 10.5C4 6.916 6.916 4 10.5 4S17 6.916 17 10.5 14.084 17 10.5 17zm10.229 2.315-3.56-3.56A8.452 8.452 0 0 0 19 10.5C19 5.813 15.187 2 10.5 2 5.813 2 2 5.813 2 10.5c0 4.687 3.813 8.5 8.5 8.5a8.451 8.451 0 0 0 5.254-1.831l4.197 4.195.634.636H22v-1.414l-1.271-1.271z"
                                fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                          </div>
                          <input autoComplete="off" type="text" id="search" data-testid="search-input"
                                 data-cy="search-bar-input" placeholder="Search" className={styles.actualSearchBar}
                                 aria-describedby="" color="#002F34" aria-invalid="false"
                                 aria-labelledby="undefined-label" value=""/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.localisationOuterOuterOuterOuterOuterContainer}>
                  <div className={styles.localisationOuterOuterOuterOuterContainer}>
                    <div className={styles.localisationOuterOuterOuterContainer}>
                      <div className={styles.localisationOuterOuterContainer}>
                        <div className={styles.localisationOuterContainer}>
                          <div className={styles.localisationContainer}>
                            <div className={styles.localisationIconContainer}>
                              <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                   id="location-input-icon" className={styles.searchIcon}>
                                <path
                                  d="M12 2c4.963 0 9 4.037 9 9 0 4.701-5.034 9.195-7.328 11h-3.344C8.035 20.195 3 15.701 3 11c0-4.963 4.037-9 9-9zm0 2c-3.86 0-7 3.14-7 7 0 3.75 4.614 7.981 6.995 9.764C13.749 19.434 19 15.108 19 11c0-3.86-3.14-7-7-7zm0 3c2.206 0 4 1.794 4 4 0 2.205-1.794 4-4 4-2.205 0-4-1.795-4-4 0-2.206 1.795-4 4-4zm0 2c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"
                                  fill="currentColor" fillRule="evenodd"></path>
                              </svg>
                            </div>
                            <input autoComplete="off" type="text" id="location-input"
                                   data-testid="location-search-input" data-cy="location-search-input"
                                   aria-label={"Entire Country"} placeholder={"Entire Country"}
                                   className={styles.localisationInput}
                                   aria-describedby="" name="location-Field" color="#002F34" aria-invalid="false"
                                   aria-labelledby="location-Field-label" value=""/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button type="submit" name="searchBtn" data-testid="search-submit" className={styles.button}>
                    Search
                    <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         className={styles.searchButtonIcon}>
                      <path
                        d="M10.5 17A6.508 6.508 0 0 1 4 10.5C4 6.916 6.916 4 10.5 4S17 6.916 17 10.5 14.084 17 10.5 17zm10.229 2.315-3.56-3.56A8.452 8.452 0 0 0 19 10.5C19 5.813 15.187 2 10.5 2 5.813 2 2 5.813 2 10.5c0 4.687 3.813 8.5 8.5 8.5a8.451 8.451 0 0 0 5.254-1.831l4.197 4.195.634.636H22v-1.414l-1.271-1.271z"
                        fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}