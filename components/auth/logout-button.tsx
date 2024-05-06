"use client";

import React from "react";
import { logout } from "@/actions/logout";
import { Session } from "next-auth";
import { UpdateSession } from "next-auth/react";

interface LogoutButtonProps
{
  children?: React.ReactNode;
  session?: {update: UpdateSession, data: Session, status: "authenticated"} | {} | null
}

export function LogoutButton ( { children, session }: LogoutButtonProps ): JSX.Element
{
  const onClick = async (): Promise<void> =>
  {
    await logout();
    await (session || null)?.update();
  };
  
  return (
    <span onClick={onClick} className={"cursor-pointer"}>
      {children}
    </span>
  );
}