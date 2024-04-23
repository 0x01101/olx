import styles from "@/app/ui/elements/footer.module.css";
import { Fixlypl, Obidopl, OLXbg, OLXpt, OLXro, OLXua, Otodompl, Otomotopl } from "@/app/ui/elements/partnerIcons";

export default function Footer (): JSX.Element
{
  return (
    <div id={"footerContent"} className={styles.footerContent}>
      <div className={styles.actualFooter}>
        <div className={styles.main}>
        
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