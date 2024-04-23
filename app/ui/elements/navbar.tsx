import styles from "@/app/ui/elements/navbar.module.css";

export default function NavBar(): JSX.Element {
  return (
    <header className={styles.navbar}>
      <div className={styles.css1u6y1sg}>
        <span className={styles.logoContainer}>
          <a href={"/"}>
            <span className={styles.o}></span>
            <span className={styles.l}></span>
            <span className={styles.x}></span>
          </a>
        </span>
      </div>
    </header>
  );
}