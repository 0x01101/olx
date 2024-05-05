"use client";

import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Page (): JSX.Element
{
  const user = useCurrentUser();
  
  const onClick = async () =>
  {
    await signOut();
  };
  
  return (
    <div className={"bg-white p-10 rounded-xl"}>
      <button onClick={onClick}>
        Sign out
      </button>
    </div>
  );
}