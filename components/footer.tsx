"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GitHubLogoIcon, GlobeIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export function Footer (): JSX.Element
{
  const [ ip, setIp ] = useState( "" );
  
  useEffect( () =>
  {
    const fetchIp = async () =>
    {
      const res = await fetch( "https://api.ipify.org?format=json" );
      const data = await res.json();
      setIp( data.ip );
    };
    fetchIp().then();
  }, [] );
  
  return (
    <footer className={"bg-muted text-white w-full bottom-0 p-2"}>
      <div className={"w-full border-primary border-[1px]"} />
      <div className={"container mx-auto py-4"}>
        <div className={"flex justify-between items-center"}>
          <div>
            <p className={"text-sm"}>{ip}</p>
          </div>
          <div className={"flex flex-row space-x-2"}>
            <SocialMediaButton href={"https://github.com/0x01101"} color={"#171515"}>
              <GitHubLogoIcon className={"h-7 w-7"} />
            </SocialMediaButton>
            <SocialMediaButton href={"https://x.com/0xe0b69e"} color={"#179cf0"}>
              <TwitterLogoIcon className={"h-7 w-7"} />
            </SocialMediaButton>
            <SocialMediaButton href={"https://j3rzy.dev/"} color={"#9b0097"}>
              <GlobeIcon className={"h-7 w-7"} />
            </SocialMediaButton>
          </div>
          <div>
            <p className={"text-sm"}>Made with ❤️ by <Link
              target={"_blank"}
              href={"https://github.com/0x01101"}
            >0x01101</Link>
              </p>
          </div>
        </div>
      </div>
      <div className={"w-full border-primary border-[1px]"} />
    </footer>
  );
}

function SocialMediaButton ( { href, color, children }: {
  href: string,
  color: string,
  children: React.ReactNode
} ): JSX.Element
{
  return (
    <Link href={href} target={"_blank"}>
      <div
        className={`w-10 h-10 rounded-md flex items-center justify-center`}
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </Link>
  );
}