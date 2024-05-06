import styles from "@/app/ui/elements/categoryName/css/categoryDropdown.module.css";
import { Category } from "@/app/lib/definitions";

export default function CategoryDropdown ( { categories }: { categories: Category[] } ): JSX.Element
{
  return (
    <div className={styles.container}>
      <ul data-cy="category-dropdown-list" data-testid="category-dropdown-list" className={styles.ul}
          style={{ maxHeight: "none" }}>
        {categories.map( ( c: Category, i: number ): JSX.Element => (
          <li data-categoryid={c.id} className={styles.entry} key={i}>
            <div className={styles.entryInfoContainer}>
            
            </div>
          </li>
        ) ).join( "\n" )}
      </ul>
      {/*<div>TODO: Subcategories</div>*/}
    </div>
  );
}