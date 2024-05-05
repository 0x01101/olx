"use client";

import { useSession } from "next-auth/react";

export default function Page ()
{
  const session = useSession();
  
  return (
    <div>
      {JSON.stringify( session )}
      <form>
        <button type={"submit"}>
          Sign out
        </button>
      </form>
    </div>
  );
}