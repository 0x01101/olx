import styles from "@/app/ui/elements/categoryName/css/listingCard.module.css";
import { Product } from "@/app/lib/definitions";

export default function ListingCard ( { product }: { product: Product } ): JSX.Element
{
  return (
    <div data-cy="l-card" data-testid="l-card" id={`${product.id}`} className={styles.outerContainer}>
      <div className={styles.container}>
        <div typeof={"list"} className={styles.elementsContainer}>
          <div typeof={"list"} className={styles.imageContainer}>
            <a className={styles.imageLinkElement} href={`/d/offer/${product.name.replace(/-/g, "-")}-${product.id}`}>
              <div typeof={"list"} className={styles.imagesContainer}>
                <div className={styles.images}>
                  {/* Images here */}
                </div>
              </div>
            </a>
          </div>
          <div typeof={"list"} className={styles.infoContainer}>
          
          </div>
        </div>
      </div>
    </div>
  );
}