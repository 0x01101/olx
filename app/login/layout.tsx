import "./ui/css/global.css";
import { inter } from "@/app/ui/fonts";
import "@/app/lib/processHandlers";
import { Metadata } from "next";
import styles from "@/app/ui/css/login.module.css";

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
    <div id={"__next"}>
      <div className={"login-page"}>
        <div data-testid={"core-layout"} className={styles.coreLayout}>
          {children}
        </div>
      </div>
    </div>
    </body>
    </html>
  );
}