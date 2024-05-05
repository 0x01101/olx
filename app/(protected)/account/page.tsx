"use client";

import { signOut, useSession } from "next-auth/react";

export default function Page ()
{
  const session = useSession();
  
  const onClick = async () =>
  {
    await signOut();
  };
  
  return (
    <div>
      {JSON.stringify( session )}
      <button onClick={onClick}>
        Sign out
      </button>
    </div>
  );
}