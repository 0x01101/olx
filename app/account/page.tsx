"use client";

import { getSession } from "next-auth/react";
import { useState } from "react";
import { Session } from "next-auth";

export default function Page (): JSX.Element
{
  const [ session, setSession ] = useState<Session>();
  
  ( async () =>
  {
    const session = await getSession();
    if ( session ) setSession( session );
  } )();
  
  return (
    <>
      <h1>Account</h1>
      <p>{JSON.stringify(session?.user)}</p>
    </>
  );
}