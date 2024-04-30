import styles from "@/app/ui/css/login.module.css";
import LoginForm from "@/app/ui/elements/login/loginForm";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <div className={styles.grid}>
      <div className={styles.outerContainer}>
        <LoginForm />
      </div>
    </div>
  );
}