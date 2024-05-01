import styles from "@/app/ui/css/login.module.css";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:        "OLX.PL - Login",
  description:  "olx's clone or smth, idk",
  metadataBase: new URL( "https://j3rzy.dev/" ),
};

export default function LoginLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <div className={"login-page"}>
      <div data-testid={"core-layout"} className={styles.coreLayout}>
        {children}
      </div>
    </div>
  );
}