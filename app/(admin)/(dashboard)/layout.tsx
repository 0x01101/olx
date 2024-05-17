import { Metadata } from "next";
import React from "react";

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
    <div className={"h-full flex flex-col bg-primary"}>
      {children}
    </div>
  );
}