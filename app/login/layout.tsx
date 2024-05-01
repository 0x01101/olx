import "@/app/ui/css/global.css";
import { inter } from "@/app/ui/fonts";
import "@/app/lib/processHandlers";
import { Metadata } from "next";
import styles from "@/app/ui/css/login.module.css";
import React from "react";

export const metadata: Metadata = {
  title:        "OLX.PL - Login",
  description:  "olx's clone or smth, idk",
  metadataBase: new URL( "https://j3rzy.dev/" ),
};

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <html lang="en">
    <body className={`${inter.className} antialiased`}>
    <div className={"login-page"}>
      <div data-testid={"core-layout"} className={styles.coreLayout}>
        {children}
      </div>
    </div>
    </body>
    </html>
  );
}