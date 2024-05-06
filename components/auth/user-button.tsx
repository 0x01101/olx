"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { FaUserXmark } from "react-icons/fa6";
import Link from "next/link";

export function UserButton (): JSX.Element
{
  const user = useCurrentUser();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className={user ? "bg-sky-400" : "bg-red-500"}>
            {user ? <FaUser className={"text-white"} /> : <FaUserXmark className={"text-white"} />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-40 z-[1031]"} align={"end"}>
        {user ? (
          <LogoutButton>
            <DropdownMenuItem>
              <ExitIcon className={"h-4 w-4 mr-2"} />
              Log Out
            </DropdownMenuItem>
          </LogoutButton>
        ) : (
          <Link href={"/auth/login"} className={"no-underline text-black"}>
            <DropdownMenuItem>
              <EnterIcon className={"h-4 w-4 mr-2"} />
              Log In
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}