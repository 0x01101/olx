"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple, FaDiscord, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export function Social (): JSX.Element
{
  const onClick = async ( provider: "google" | "github" | "apple" | "discord" ): Promise<void> =>
  {
    await signIn( provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    } );
  };
  
  return (
    <div className={"flex items-center w-full gap-y-2 flex-col"}>
      <div className={"flex items-center w-full gap-x-2"}>
        <Button
          size={"lg"}
          className={"w-full"}
          variant={"outline"}
          onClick={() => onClick( "google" )}
        >
          <FcGoogle className={"h-5 w-5"} />
        </Button>
        <Button
          size={"lg"}
          className={"w-full"}
          variant={"outline"}
          onClick={() => onClick( "github" )}
        >
          <FaGithub className={"h-5 w-5"} />
        </Button>
      </div>
      <div className={"flex items-center w-full gap-x-2"}>
        <Button
          size={"lg"}
          className={"w-full"}
          variant={"outline"}
          onClick={() => onClick( "discord" )}
        >
          <FaDiscord className={"h-5 w-5"} />
        </Button>
        <Button
          size={"lg"}
          className={"w-full"}
          variant={"outline"}
          onClick={() => onClick( "apple" )}
        >
          <FaApple className={"h-5 w-5"} />
        </Button>
      </div>
    </div>
  );
}