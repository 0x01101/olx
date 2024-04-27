"use client";

import styles from "@/app/ui/elements/categoryName/css/listingCard.module.css";
import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import config from "@/config.json";
import { capitalize } from "@/app/lib/text";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend( relativeTime );
dayjs.extend( localizedFormat );
dayjs.extend( isToday );
dayjs.extend( isYesterday );
dayjs.extend( weekOfYear );

function formatDate ( date: Date ): string
{
  const now: Dayjs = dayjs();
  const givenDate: Dayjs = dayjs( date );
  
  if ( givenDate.isToday() )
  {
    return `Today at ${givenDate.format( "HH:mm" )}`;
  }
  if ( givenDate.isYesterday() )
  {
    return `Yesterday at ${givenDate.format( "HH:mm" )}`;
  }
  if ( now.week() === givenDate.week() )
  {
    return `${givenDate.format( "dddd" )} at ${givenDate.format( "HH:mm" )}`;
  }
  return givenDate.format( "dddd, MMMM D" );
}

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
                         alt={`${product.name} (${product.id})`} className={styles.imageElement} width={216} height={152} />
                </div>
              </div>
            </a>
          </div>
          <div typeof={"list"} className={styles.infoOuterContainer}>
            <div className={styles.infoContainer}>
              <a className={styles.nameAElement} href={URL}>
                <h6 className={styles.nameText}>{product.name}</h6>
              </a>
              <p data-testid="ad-price" className={styles.priceContainer}>
                {`${product.price}${config.currency}`}
                {product.negotiable ? <span className={styles.negotiable}>negotiable</span> : ""}
              </p>
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.conditionContainer}>
                <span>
                  <span title={capitalize( product.condition )} className={styles.condition}>
                    <span>{capitalize( product.condition )}</span>
                  </span>
                </span>
              </div>
            </div>
            <div className={styles.timestampContainer}>
              <p data-testid="location-date" className={styles.timestamp}>
                {formatDate( product.created_at )}
              </p>
              <div color="text-global-secondary" className={styles.textGlobalOrSmthIdk} />
            </div>
            <span data-testid="adAddToFavorites" className={styles.watchContainer}>
              <div className={styles.watchInnerContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                     className={styles.watchIcon}><path fill="currentColor" fillRule="evenodd"
                                                  d="M20.219 10.367 12 20.419 3.806 10.4A3.96 3.96 0 0 1 3 8c0-2.206 1.795-4 4-4a4.004 4.004 0 0 1 3.868 3h2.264A4.003 4.003 0 0 1 17 4c2.206 0 4 1.794 4 4 0 .868-.279 1.698-.781 2.367M17 2a5.999 5.999 0 0 0-5 2.686A5.999 5.999 0 0 0 7 2C3.692 2 1 4.691 1 8a5.97 5.97 0 0 0 1.232 3.633L10.71 22h2.582l8.501-10.399A5.943 5.943 0 0 0 23 8c0-3.309-2.692-6-6-6"></path></svg>
                <div data-testid="favorite-icon" className={styles.watchText}>Watch</div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}