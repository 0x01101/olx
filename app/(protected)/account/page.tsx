"use client";

import { Widget } from "@/components/widget";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Page (): JSX.Element
{
  const session = useSession();
  
  return (
    <Widget>
      <Button onClick={async () => {
        const heyo = await session.update({ username: "its username dud" });
        console.log(heyo);
      }}>
        Click Me!
      </Button>
    </Widget>
  );
}