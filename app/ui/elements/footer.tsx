import styles from "@/app/ui/elements/css/footer.module.css";
import { Fixlypl, Obidopl, OLXbg, OLXpt, OLXro, OLXua, Otodompl, Otomotopl } from "@/app/ui/elements/partnerIcons";
import Image from "next/image";
import Link from "next/link";

export default function Footer (): JSX.Element
{
  return (
    <div id={"footerContent"} className={`${styles.footerContent} bg-background border-t-2 border-t-primary`}>
      <div className={`${styles.actualFooter} bg-background`}>
        <div className={styles.main}>
          <ul className={styles.section}>
            <li><Link href="https://www.olx.pl/mobileapps" title="Aplikacje mobilne OLX.pl" target="_blank">OLX.pl&apos;s
              mobile applications</Link></li>
            <li><Link href="https://pomoc.olx.pl/hc/pl" title="Help" target="_blank">Help</Link></li>
            <li><Link href="https://www.olx.pl/payment/dlaczego-warto-promowac/" title="Featured announcement"
                   target="_blank">Featured announcement</Link></li>
            <li><Link href="http://biznes.olx.pl/" title="Offert for business" target="_self">Offert for business</Link></li>
            <li><Link href="https://blog.olx.pl" title="Blog" target="_blank">Blog</Link></li>
            <li><Link href="https://pomoc.olx.pl/hc/pl/articles/360000828525" title="Terms and Conditions"
                   target="_blank">Terms and Conditions</Link></li>
            <li><Link href="https://pomoc.olx.pl/hc/pl/articles/360000901525" title="Privacy policy" target="_blank">Privacy
              policy</Link></li>
            <li><Link
              href="https://ad.olx.pl/reklama_olx/?utm_source=footer&amp;utm_medium=link&amp;utm_campaign=footerolxpl"
              title="Ad" target="_blank">Ad</Link></li>
            <li><Link href="https://media.olx.pl" title="Press Office" target="_blank">Press Office</Link></li>
            <li><Link
              href="https://pomoc.olx.pl/hc/pl/categories/4558242641308-Informacja-o-realizowanej-strategii-podatkowej"
              title="Information on the implemented strategy tax" target="_blank">Information on the implemented
              strategy tax</Link></li>
          </ul>
          <ul className={styles.section}>
            <li><Link href="https://www.olx.pl/safetyuser" title="Security rules" target="_blank">Security rules</Link></li>
            <li><Link href="https://www.olx.pl/sitemap" title="Category map" target="_blank">Category map</Link></li>
            <li><Link href="https://www.olx.pl/sitemap/regions" title="Town map" target="_blank">Town map</Link></li>
            <li><Link href="popular" title="Popular Searches" target="_blank">Popular Searches</Link></li>
            <li><Link href="https://www.olxgroup.com/careers" title="Careers" target="_blank">Careers</Link></li>
            <li><Link href="https://www.olx.pl/howitworks" title="Jak działa OLX.pl" target="_blank">How OLX.pl works</Link>
            </li>
            <li><Link href="https://pomoc.olx.pl/hc/pl/articles/5711173660444-Cennik" title="Pricing"
                   target="_blank">Pricing</Link></li>
            <li><Link href="https://zawodowo.olx.pl" title="Professionally OLX - job site" target="_blank">Professionally OLX - job site</Link></li>
            <li><Link href="https://przesylki.olx.pl" title="How they work OLX shipments" target="_blank">How they work OLX shipments</Link></li>
            <li><Link href="https://operatorplatnosci.olx.pl" title="Data verification" target="_blank">Data verification</Link></li>
            <li><Link
              href="https://pomoc.olx.pl/olxplhelp/s/article/polityka-dotycz%C4%85ca-cookies-i-podobnych-technologii-V14-olx"
              title="Cookie policy" target="_blank">Cookie policy</Link></li>
            <li><a>Cookie settings</a></li>
          </ul>
          <div className={styles.appSection} data-cy={"app-store-links"}>
            <ul className={styles.appstoreButtonsContainer}>
              <li className={styles.appstoreButton}>
                <Link
                  href="https://play.google.com/store/apps/details?id=pl.tablica&amp;referrer=utm_source%3Dolx.pl%26utm_medium%3Dcpc%26utm_campaign%3Dandroid-app-footer"
                  target="_blank" rel="noopener noreferrer" data-testid="google"><Image
                  src="/app/static/media/google_play.svg" alt="Google Play" width={"135"}
                  height={"40"} /></Link>
              </li>
              <li className={styles.appstoreButton}>
                <Link href="https://itunes.apple.com/pl/app/olx.pl-darmowe-og-oszenia/id531717763?l=pl&amp;ls=1&amp;mt=8"
                   target="_blank" rel="noopener noreferrer" data-testid="apple"><Image
                  src="/app/static/media/app_store.svg" alt="App Store" width={"120"}
                  height={"40"} /></Link>
              </li>
            </ul>
            <p className={styles.appSectionText}>Free app on Your phone</p>
          </div>
        </div>
        <div className={styles.partners}>
          <div data-test-id="partner-logos-strip" className={styles.partnersLogosStrip}>
            <Link href={"https://olx.bg"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <OLXbg />
              </span>
              <span className={styles.partnerName}>OLX.bg</span>
            </Link>
            <Link href={"https://olx.ro"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <OLXro />
              </span>
              <span className={styles.partnerName}>OLX.ro</span>
            </Link>
            <Link href={"https://olx.ua"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <OLXua />
              </span>
              <span className={styles.partnerName}>OLX.ua</span>
            </Link>
            <Link href={"https://olx.pt"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <OLXpt />
              </span>
              <span className={styles.partnerName}>OLX.pt</span>
            </Link>
            <Link href={"https://fixly.pl"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <Fixlypl />
              </span>
              <span className={styles.partnerName}>Fixly.pl</span>
            </Link>
            <Link href={"https://www.otodom.pl"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <Otodompl />
              </span>
              <span className={styles.partnerName}>Otomoto.pl</span>
            </Link>
            <Link href={"https://www.otomoto.pl"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <Otomotopl />
              </span>
              <span className={styles.partnerName}>Otomoto.pl</span>
            </Link>
            <Link href={"https://www.obido.pl"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <Obidopl />
              </span>
              <span className={styles.partnerName}>obido.pl</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}