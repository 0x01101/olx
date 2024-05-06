"use client";

import { PiBell, PiBellRinging } from "react-icons/pi";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function NotificationsButton (): JSX.Element
{
  const notifications = []; // TODO: Fetch notifications
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {notifications.length ? <PiBellRinging/> : <PiBell className={"w-7 h-7 mr-1"}/>}
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}