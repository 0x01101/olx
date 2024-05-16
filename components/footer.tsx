"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer (): JSX.Element
{
  const [ip, setIp] = useState('');
  
  useEffect(() => {
    const fetchIp = async () => {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setIp(data.ip);
    };
    fetchIp().then();
  }, []);
  
  return (
    <footer className={"bg-muted text-white w-full bottom-0 p-2"}>
      <div className={"w-full border-primary border-[1px]"} />
      <div className={"container mx-auto py-4"}>
        <div className={"flex justify-between"}>
          <div>
            <p className={"text-sm"}>{ip}</p>
          </div>
          <div>
            <p className={"text-sm"}>Made with ❤️ by <Link href={"https://github.com/0x01101"}>0x01101</Link></p>
          </div>
        </div>
      </div>
      <div className={"w-full border-primary border-[1px]"} />
    </footer>
  );
}