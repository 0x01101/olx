import NavBar from "@/components/navbar";
import Footer from "@/app/ui/elements/footer";
import styles from "@/app/ui/css/layout.module.css";
import React from "react";

export default function MainLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <>
      <NavBar />
      <div id={"mainContent"} className={styles.mainContent}>
        {children}
      </div>
      <Footer />
    </>
  );
}