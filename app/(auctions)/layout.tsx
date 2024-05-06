import NavBar from "@/components/navbar";
import Footer from "@/app/ui/elements/footer";
import React from "react";

export default function Layout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <>
      <NavBar />
      <div className={"pt-[72px] min-h-[80vh] bg-[#f2f4f5]"}>
        {children}
      </div>
      <Footer />
    </>
  );
}