"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface LoginButtonProps
{
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LoginButton ( { children, mode = "redirect", asChild }: LoginButtonProps )
{
  const router: AppRouterInstance = useRouter();
  
  const onClick = (): void =>
  {
    router.push( "/auth/login" );
  };
  
  if ( mode == "modal" )
  {
    return (
      <span>
        TODO: Implement modal
      </span>
    );
  }
  
  return (
    <span onClick={onClick} className={"cursor-pointer"}>
      {children}
    </span>
  );
};