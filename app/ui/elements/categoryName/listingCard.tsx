"use client";

import styles from "@/app/ui/elements/categoryName/css/listingCard.module.css";
import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import config from "@/config.json";

export default function ListingCard ( { product }: { product: Product } ): JSX.Element
{
  const URL: string = `/d/offer/${product.name.replace( /-/g, "-" )}-${product.id}`;
  
  return (
    <div data-cy="l-card" data-testid="l-card" id={`${product.id}`} className={styles.outerContainer}>
      <div className={styles.container}>
        <div typeof={"list"} className={styles.elementsContainer}>
          <div typeof={"list"} className={styles.imageContainer}>
            <a className={styles.imageLinkElement} href={URL}>
              <div typeof={"list"} className={styles.imagesContainer}>
                <div className={styles.images}>
                  <Image src={`/app/static/media/images/products/${product.uuid}/main`}
                         alt={`${product.name} (${product.id})`} className={styles.imageElement} />
                </div>
              </div>
            </a>
          </div>
          <div typeof={"list"} className={styles.infoContainer}>
            <div className={styles.infoContainer}>
              <a className={styles.nameAElement} href={URL}>
                <h6 className={styles.nameText}>{product.name}</h6>
              </a>
              <p data-testid="ad-price" className={styles.priceContainer}>
                {`${product.price}${config.currency}`}
                {/* TODO: <span className={styles.negotiable}>negotiable</span> */}
              </p>
            </div>
            <div className={styles.infoContainer}>
            
            </div>
            <div></div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}