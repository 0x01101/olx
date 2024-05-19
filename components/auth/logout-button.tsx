"use client";

import React from "react";
import { signOut } from "next-auth/react";

interface LogoutButtonProps
{
  children?: React.ReactNode;
}

export function LogoutButton ( { children }: LogoutButtonProps ): JSX.Element
{
  return (
    <span onClick={() => signOut()} className={"cursor-pointer"}>
      {children}
    </span>
  );
}