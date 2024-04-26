import "./ui/css/global.css";
import { inter } from "@/app/ui/fonts";
import NavBar from "@/app/ui/elements/navbar";
import Footer from "@/app/ui/elements/footer";
import "@/app/lib/processHandlers";
import { Metadata } from "next";
import styles from "@/app/ui/css/index.module.css";

export const metadata: Metadata = {
  title:        {
    template: "%s | olx.pl",
    default:  "olx.pl",
  },
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
    <div id={"hydrate-root"}>
      <NavBar />
      <div id={"mainContent"} className={styles.mainContent}>
        {children}
      </div>
      <Footer />
    </div>
    </body>
    </html>
  );
}