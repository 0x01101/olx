import NavBar from "@/components/navbar";
import React from "react";
import { AddListingButton } from "@/components/add-listing-button";
import { Footer } from "@/components/footer";

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
      <div className={"pt-[72px] min-h-[100vh] bg-primary"}>
        {children}
      </div>
      <Footer />
    </>
  );
}