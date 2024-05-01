import styles from "@/app/ui/css/login.module.css";
import LoginForm from "@/app/ui/elements/login/loginForm";
import LoginLayout from "@/app/ui/layouts/loginLayout";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <LoginLayout>
      <div className={styles.grid}>
        <div className={styles.outerContainer}>
          <LoginForm />
        </div>
      </div>
    </LoginLayout>
  );
}