"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { dosis } from "@/lib/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";
import { UserButton } from "@/components/auth/user-button";

interface SideBarProps
{
  children: React.ReactNode;
}

export function SideBar ({children}: SideBarProps): JSX.Element
{
  return (
    <div
      className={"fixed top-0 left-0 w-[200px] h-full p-3 pr-0"}
    >
      <div className={"flex flex-col items-center space-y-3 h-full bg-muted p-3 rounded-md"}>
        {children}
        <div className="flex-grow" />
        <UserButton variant={"info"} />
      </div>
    </div>
  );
}

interface EntryProps
{
  children: React.ReactNode;
  href: string;
  corePath: string;
}

export function Entry ( { children, href, corePath }: EntryProps ): JSX.Element
{
  const pathname: string = usePathname();
  const path: string = `${corePath}/${href}`;
  
  return (
    <Link
      className={cn(
        "w-full rounded-md p-2 hover:scale-110 transition-all",
        pathname === path ? "bg-emerald-700" : "bg-popover",
      )}
      href={path}
    >
      <div className={"flex flex-row space-x-2 w-full h-full text-center items-center justify-center"}>
        {children}
      </div>
    </Link>
  );
}