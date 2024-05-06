"use client";

import { useEffect, useState } from "react";

export default function NavBar (): JSX.Element
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
      className={"bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm transition-transform duration-300 ease-in-out"}
      style={visible ? {} : { top: "-72px" }}
    >
    Navbar
    </nav>
  );
}