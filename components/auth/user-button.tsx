"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "@/components/auth/logout-button";
import { DashboardIcon, EnterIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { FaUserXmark } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserAvatar } from "@/components/auth/user-avatar";
import { UserRole } from "@prisma/client";

interface UserButtonProps
{
  variant?: "avatar" | "info";
}

export function UserButton ( { variant }: UserButtonProps ): JSX.Element
{
  const pathname: string = usePathname();
  const session = useSession();
  const user = session?.data?.user;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {( (): JSX.Element =>
        {
          switch ( variant )
          {
            case "avatar":
              return <UserAvatar user={user} />;
            case "info":
              return (
                <div className={"flex flex-row space-x-2 justify-center items-center p-0 w-full"}>
                  <UserAvatar user={user} />
                  <div className={"flex flex-col text-xs"}>
                    <p className={"font-bold"}>{user?.name}</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
              )
            default:
              return <UserAvatar user={user} />;
          }
        } )()}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-[255px] z-[1031]"} align={"end"}>
        {user ? (
          <>
            <DropdownMenuLabel>
              <div className={"flex flex-row space-x-2 items-center"}>
                <Avatar>
                  <AvatarImage src={user?.image ?? ""} />
                  <AvatarFallback className={user ? "bg-sky-400" : "bg-red-500"}>
                    {user ? <FaUser className={"text-white"} /> : <FaUserXmark className={"text-white"} />}
                  </AvatarFallback>
                </Avatar>
                <div className={"flex flex-col"}>
                  <p className={"text-xs"}>{user.name}</p>
                  <p className={"text-[10px]"}>{user.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            {user?.role === UserRole.ADMIN && (
              <Link
                href={`/dashboard`}
                className={"no-underline"}
              >
                <DropdownMenuItem className={"text-gray-400"}>
                  <DashboardIcon className={"h-4 w-4 mr-2"} />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            )}
            <Link
              href={`/account`}
              className={"no-underline"}
            >
              <DropdownMenuItem className={"text-gray-400"}>
                <GearIcon className={"h-4 w-4 mr-2"} />
                My Account
              </DropdownMenuItem>
            </Link>
            <LogoutButton>
              <DropdownMenuItem className={"text-gray-400"}>
                <ExitIcon className={"h-4 w-4 mr-2"} />
                Log Out
              </DropdownMenuItem>
            </LogoutButton>
          </>
        ) : (
          <Link
            href={`/auth/login?redirectUrl=${pathname}`}
            className={"no-underline"}
          >
            <DropdownMenuItem className={"text-gray-400"}>
              <EnterIcon className={"h-4 w-4 mr-2"} />
              Log In
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}