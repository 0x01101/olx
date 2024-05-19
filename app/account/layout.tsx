import { Metadata } from "next";
import React from "react";
import { Entry, SideBar } from "@/components/dashboard/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { dosis } from "@/lib/fonts";
import { GearIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Account",
};

export default async function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ): Promise<JSX.Element>
{
  return (
    <div className={"min-h-screen bg-primary flex"}>
      <SideBar>
        <Link
          href={"/account"}
          className={"w-full bg-primary rounded-md p-2 flex flex-row space-x-2 text-center items-center justify-center"}
        >
          <GearIcon className={"w-6 h-6"} />
          <p className={cn( "font-bold text-2xl text-center", dosis.className )}>Account</p>
        </Link>
        {/*<Entry corePath={"/account"} href={"general"}>
          General
        </Entry>*/}
      </SideBar>
      <div className={"w-full h-full ml-[200px]"}>
        {children}
      </div>
    </div>
  );
}