import React from "react";
import { NavBar } from "@/app/(protected)/_components/navbar";

interface LayoutProps
{
  children: React.ReactNode;
}

export default function Layout ( { children }: LayoutProps ): JSX.Element
{
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[#3a77ff]">
      <NavBar />
      {children}
    </div>
  );
}