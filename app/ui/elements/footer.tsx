import styles from "@/app/ui/elements/footer.module.css";
import { Fixlypl, Obidopl, OLXbg, OLXpt, OLXro, OLXua, Otodompl, Otomotopl } from "@/app/ui/elements/partnerIcons";
import Image from "next/image";

export default function Footer (): JSX.Element
{
  return (
    <div id={"footerContent"} className={styles.footerContent}>
      <div className={styles.actualFooter}>
        <div className={styles.main}>
          <ul className={styles.section}>
            <li><a href="https://www.olx.pl/mobileapps" title="Aplikacje mobilne OLX.pl" target="_blank">OLX.pl&apos;s
              mobile applications</a></li>
            <li><a href="https://pomoc.olx.pl/hc/pl" title="Help" target="_blank">Help</a></li>
            <li><a href="https://www.olx.pl/payment/dlaczego-warto-promowac/" title="Featured announcement"
                   target="_blank">Featured announcement</a></li>
            <li><a href="http://biznes.olx.pl/" title="Offert for business" target="_self">Offert for business</a></li>
            <li><a href="https://blog.olx.pl" title="Blog" target="_blank">Blog</a></li>
            <li><a href="https://pomoc.olx.pl/hc/pl/articles/360000828525" title="Terms and Conditions"
                   target="_blank">Terms and Conditions</a></li>
            <li><a href="https://pomoc.olx.pl/hc/pl/articles/360000901525" title="Privacy policy" target="_blank">Privacy
              policy</a></li>
            <li><a
              href="https://ad.olx.pl/reklama_olx/?utm_source=footer&amp;utm_medium=link&amp;utm_campaign=footerolxpl"
              title="Ad" target="_blank">Ad</a></li>
            <li><a href="https://media.olx.pl" title="Press Office" target="_blank">Press Office</a></li>
            <li><a
              href="https://pomoc.olx.pl/hc/pl/categories/4558242641308-Informacja-o-realizowanej-strategii-podatkowej"
              title="Information on the implemented strategy tax" target="_blank">Information on the implemented
              strategy tax</a></li>
          </ul>
          <ul className={styles.section}>
            <li><a href="https://www.olx.pl/safetyuser" title="Security rules" target="_blank">Security rules</a></li>
            <li><a href="https://www.olx.pl/sitemap" title="Category map" target="_blank">Category map</a></li>
            <li><a href="https://www.olx.pl/sitemap/regions" title="Town map" target="_blank">Town map</a></li>
            <li><a href="popular" title="Popular Searches" target="_blank">Popular Searches</a></li>
            <li><a href="https://www.olxgroup.com/careers" title="Careers" target="_blank">Careers</a></li>
            <li><a href="https://www.olx.pl/howitworks" title="Jak działa OLX.pl" target="_blank">How OLX.pl works</a>
            </li>
            <li><a href="https://pomoc.olx.pl/hc/pl/articles/5711173660444-Cennik" title="Pricing"
                   target="_blank">Pricing</a></li>
            <li><a href="https://zawodowo.olx.pl" title="Professionally OLX - job site" target="_blank">Professionally OLX - job site</a></li>
            <li><a href="https://przesylki.olx.pl" title="How they work OLX shipments" target="_blank">How they work OLX shipments</a></li>
            <li><a href="https://operatorplatnosci.olx.pl" title="Data verification" target="_blank">Data verification</a></li>
            <li><a
              href="https://pomoc.olx.pl/olxplhelp/s/article/polityka-dotycz%C4%85ca-cookies-i-podobnych-technologii-V14-olx"
              title="Cookie policy" target="_blank">Cookie policy</a></li>
            <li><a>Cookie settings</a></li>
          </ul>
          <div className={styles.appSection} data-cy={"app-store-links"}>
            <ul className={styles.appstoreButtonsContainer}>
              <li className={styles.appstoreButton}>
                <a
                  href="https://play.google.com/store/apps/details?id=pl.tablica&amp;referrer=utm_source%3Dolx.pl%26utm_medium%3Dcpc%26utm_campaign%3Dandroid-app-footer"
                  target="_blank" rel="noopener noreferrer" data-testid="google"><Image
                  src="/app/static/media/google_play.svg" alt="Google Play" width={"135"}
                  height={"40"} /></a>
              </li>
              <li className={styles.appstoreButton}>
                <a href="https://itunes.apple.com/pl/app/olx.pl-darmowe-og-oszenia/id531717763?l=pl&amp;ls=1&amp;mt=8"
                   target="_blank" rel="noopener noreferrer" data-testid="apple"><Image
                  src="/app/static/media/app_store.svg" alt="App Store" width={"120"}
                  height={"40"} /></a>
              </li>
            </ul>
            <p className={styles.appSectionText}>Free app on Your phone</p>
          </div>
        </div>
        <div className={styles.partners}>
          <div data-test-id="partner-logos-strip" className={styles.partnersLogosStrip}>
            <a href={"https://olx.bg"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <OLXbg />
              </span>
              <span className={styles.partnerName}>OLX.bg</span>
            </a>
            <a href={"https://olx.ro"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <OLXro />
              </span>
              <span className={styles.partnerName}>OLX.ro</span>
            </a>
            <a href={"https://olx.ua"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <OLXua />
              </span>
              <span className={styles.partnerName}>OLX.ua</span>
            </a>
            <a href={"https://olx.pt"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <OLXpt />
              </span>
              <span className={styles.partnerName}>OLX.pt</span>
            </a>
            <a href={"https://fixly.pl"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <Fixlypl />
              </span>
              <span className={styles.partnerName}>Fixly.pl</span>
            </a>
            <a href={"https://www.otodom.pl"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <Otodompl />
              </span>
              <span className={styles.partnerName}>Otomoto.pl</span>
            </a>
            <a href={"https://www.otomoto.pl"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <Otomotopl />
              </span>
              <span className={styles.partnerName}>Otomoto.pl</span>
            </a>
            <a href={"https://www.obido.pl"} target={"_blank"} className={styles.partnerContainer}>
              <span className={styles.partnerLogoContainer}>
                <Obidopl />
              </span>
              <span className={styles.partnerName}>obido.pl</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}