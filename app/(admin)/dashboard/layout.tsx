import { Metadata } from "next";
import React from "react";
import { SideBar } from "@/components/dashboard/sidebar";

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
      <SideBar />
      <div className={"w-full h-full"}>
        {children}
      </div>
    </div>
  );
}