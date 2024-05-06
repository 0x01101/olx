"use client";

import React from "react";
import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";

interface LogoutButtonProps
{
  children?: React.ReactNode;
}

export function LogoutButton ( { children }: LogoutButtonProps ): JSX.Element
{
  const session = useSession();
  
  const onClick = async (): Promise<void> =>
  {
    await logout();
    await session.update();
  };
  
  return (
    <span onClick={onClick} className={"cursor-pointer"}>
      {children}
    </span>
  );
}