"use client";

import styles from "@/app/ui/elements/login/css/loginForm.module.css";
import { useState } from "react";

export default function LoginForm (): JSX.Element
{
  const [ selected, setSelected ] = useState( -1 );
  
  return (
    <div className={styles.loginBox}>
      {/* maybe TODO: add OAuth */}
      <div className={styles.withUsernameAndPassword}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <header className={styles.tabsHeader}>
              <button tabIndex={-1} onClick={() => setSelected( -1 )}
                      className={selected == -1 ? styles.tabSelected : styles.tab}>
                <span>Log In</span>
              </button>
              <button tabIndex={0} onClick={() => setSelected( 0 )}
                      className={selected == 0 ? styles.tabSelected : styles.tab}>
                <span>Sign Up</span>
              </button>
            </header>
          </div>
          <div className={styles.iDunno}>
            <div className={styles.iDunnoChild}></div>
          </div>
        </div>
      </div>
    </div>
  );
}