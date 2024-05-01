import "./ui/css/global.css";
import { inter } from "@/app/ui/fonts";
import "@/app/lib/processHandlers";
import { Metadata } from "next";
import React from "react";

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
    {children}
    </body>
    </html>
  );
}