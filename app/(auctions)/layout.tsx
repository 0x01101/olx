import NavBar from "@/components/navbar";
import Footer from "@/app/ui/elements/footer";
import React from "react";
import { AddListingButton } from "@/components/add-listing-button";

export default async function Layout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ): Promise<JSX.Element>
{
  return (
    <>
      <NavBar>
        <AddListingButton />
      </NavBar>
      <div className={"pt-[72px] min-h-[80vh] bg-background"}>
        {children}
      </div>
      <Footer />
    </>
  );
}