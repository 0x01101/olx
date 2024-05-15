"use client";

import { PiBell, PiBellRinging } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notifications } from "@prisma/client";
import { useEffect, useState } from "react";
import { getNotifications } from "@/actions/fetch";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { markAsRead } from "@/actions/notifications";

export function NotificationsButton (): JSX.Element
{
  const session = useSession();
  
  const [ notifications, setNotifications ] = useState<Notifications[]>( [] );
  const [ unreadNotifications, setUnreadNotifications ] = useState<Notifications[]>( [] );
  
  useEffect( (): void =>
  {
    const fetchCategories = async (): Promise<void> =>
    {
      let result: Notifications[] = await getNotifications();
      
      result = result.sort( ( a: Notifications, b: Notifications ): number =>
        ( a.read !== b.read ) ? ( a.read ? 1 : -1 ) : ( new Date( b.createdAt ).getTime() - new Date( a.createdAt ).getTime() ) );
      
      setNotifications( result );
      setUnreadNotifications( result.filter( ( notification: Notifications ) => !notification.read ) );
    };
    
    fetchCategories().then();
  }, [] );
  
  const trim = ( text: string, length: number = 25 ): string => text.length > length ? text.substring( 0, length - 3 ) + "..." : text;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {unreadNotifications.length ? (
          <div className={"relative"}>
            <PiBellRinging className={"w-7 h-7"}/>
            <p className={"text-red-600 font-bold relative left-0 text-xs"}>{unreadNotifications.length}</p>
          </div>
        ) : <PiBell className={"w-7 h-7"}/>}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-[360px] z-[1032] space-y-1"} align={"end"}>
        <DropdownMenuLabel>
          You have {unreadNotifications.length} unread
          notification{unreadNotifications.length === 1 ? "" : "s"}
        </DropdownMenuLabel>
        {notifications.map( ( notification: Notifications ) => (
          <DropdownMenuItem
            key={notification.id}
            className={notification.read ? undefined : "border-x-2 border-x-destructive"}
            onClick={async () =>
            {
              await markAsRead( notification.id );
              setNotifications( notifications.map( ( n: Notifications ) => n.id === notification.id ? {
                ...n,
                read: true,
              } : n ) );
              setUnreadNotifications( unreadNotifications.filter( ( n: Notifications ): boolean => n.id !== notification.id ) );
            }}
          >
            <div className={"flex flex-col"}>
              <p>{trim( notification.title )}</p>
              <p>{trim( notification.message )}</p>
            </div>
          </DropdownMenuItem>
        ) )}
        {session.data?.user && <Link
          href={`/account/notifications`}
          className={"no-underline"}
        >
          <DropdownMenuItem>
            <div className={"flex flex-row space-x-2 items-center"}>
              <PiBell className={"w-6 h-6"}/>
              <p className={"text-xs"}>All Notifications</p>
            </div>
          </DropdownMenuItem>
        </Link>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}