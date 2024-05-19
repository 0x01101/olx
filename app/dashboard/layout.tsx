import { Metadata } from "next";
import React from "react";
import { Entry, SideBar } from "@/components/dashboard/sidebar";
import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { dosis } from "@/lib/fonts";

export const metadata: Metadata = {
  title:        {
    template: "%s | Jast - dashboard",
    default:  "Jast - dashboard",
  },
  description:  "Admin dashboard",
  metadataBase: new URL( "https://j3rzy.dev/" ),
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
          href={"/dashboard"}
          className={"w-full bg-primary rounded-md p-2 flex flex-row space-x-2 text-center items-center justify-center"}
        >
          <DashboardIcon className={"w-6 h-6"} />
          <p className={cn( "font-bold text-2xl text-center", dosis.className )}>Dashboard</p>
        </Link>
        <Entry href={"products"} corePath={"/dashboard"}>
          Products
        </Entry>
        <Entry href={"categories"} corePath={"/dashboard"}>
          Categories
        </Entry>
        <Entry href={"users"} corePath={"/dashboard"}>
          Users
        </Entry>
      </SideBar>
      <div className={"w-full h-full ml-[200px]"}>
        {children}
      </div>
    </div>
  );
}