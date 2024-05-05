"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NavBar (): JSX.Element
{
  const pathname: string = usePathname();
  
  return (
    <nav className={"bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm"}>
      <div className={"flex gap-x-2"}>
        <Button asChild>
          <Link href={"/account"}>
            Settings
          </Link>
        </Button>
      </div>
      <p>User Button</p>
    </nav>
  );
}