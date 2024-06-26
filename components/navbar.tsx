"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { dosis } from "@/lib/fonts";
import { UserButton } from "@/components/auth/user-button";
import { NotificationsButton } from "@/components/notifications-button";

interface NavBarProps
{
  children?: React.ReactNode;
}

export default function NavBar ( { children }: NavBarProps ): JSX.Element
{
  const [ prevScrollPos, setPrevScrollPos ] = useState( 0 );
  const [ visible, setVisible ] = useState( true );
  
  useEffect( () =>
  {
    const handleScroll = (): void =>
    {
      const currentScrollPos: number = window.scrollY;
      const isVisible: boolean = prevScrollPos > currentScrollPos;
      
      setPrevScrollPos( currentScrollPos );
      setVisible( isVisible );
    };
    
    if ( typeof window !== "undefined" )
    {
      window.addEventListener( "scroll", handleScroll );
      
      return (): void =>
      {
        window.removeEventListener( "scroll", handleScroll );
      };
    }
  }, [ prevScrollPos ] );
  
  return (
    <nav
      style={visible ? {} : { top: "-72px" }}
      className={`bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm h-[72px] fixed top-0 right-0 w-full transition-all
      ease-in-out z-[1030] duration-500 select-none rounded-t-none`}
    >
      <div className={"flex gap-x-2 mr-1"}>
        <Link
          href={"/"}
          className={`no-underline text-5xl font-extrabold ${dosis.className} inline-block bg-gradient-to-r from-[#63C6E3]
          via-[#64DCB7] to-[#F5ADFF] bg-clip-text text-transparent`}
        >
          <p>Jast</p>
        </Link>
      </div>
      {children}
      <div className={"flex gap-x-4"}>
        <NotificationsButton />
        <UserButton />
      </div>
    </nav>
  );
}