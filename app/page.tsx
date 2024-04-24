import styles from "@/app/ui/index.module.css";
import SearchBar from "@/app/ui/elements/searchbar";

export default function Page(): JSX.Element {
  return (
    <div id={"mainContent"} className={styles.mainContent}>
      <div data-testid="home-page" id="searchmain-container" className={styles.homePage}>
        <SearchBar />
      </div>
    </div>
  );
}