import NavBar from "@/components/navbar";
import Footer from "@/app/ui/elements/footer";
import React from "react";

export default async function Layout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ): Promise<JSX.Element>
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