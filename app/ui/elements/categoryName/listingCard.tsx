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
                <Image src={"/app/static/media/addToFavouritesListingCardIcon.svg"} alt={"Search icon"}
                       className={styles.watchIcon} width={22} height={22}/>
                <div data-testid="favorite-icon" className={styles.watchText}>Watch</div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}