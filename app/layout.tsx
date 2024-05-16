import "./globals.css";
import { inter } from "@/lib/fonts";
import { Metadata } from "next";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title:        {
    template: "%s | olx.pl",
    default: "Jast",
  },
  description:  "Jast - Just auction service try",
  metadataBase: new URL( "https://j3rzy.dev/" ),
};

export default async function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ): Promise<JSX.Element>
{
  const session: Session | null = await auth();
  
  return (
    <SessionProvider session={session}>
      <html lang="en">
      <body className={`${inter.className} antialiased dark`}>
      {children}
      </body>
      </html>
    </SessionProvider>
  );
}