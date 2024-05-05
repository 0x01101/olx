"use client";

import React from "react";
import { logout } from "@/actions/logout";

interface LogoutButtonProps
{
  children?: React.ReactNode;
}

export function LogoutButton ( { children }: LogoutButtonProps ): JSX.Element
{
  const onClick = async (): Promise<void> => await logout();
  
  return (
    <span onClick={onClick} className={"cursor-pointer"}>
      {children}
    </span>
  );
}