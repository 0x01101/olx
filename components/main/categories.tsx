"use client";

import Link from "next/link";
import { Category } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCat } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCategories } from "@/actions/fetch";
import { Widget } from "@/components/widget";

export default function Categories (): JSX.Element
{
  const [ categories, setCategories ] = useState<Category[]>( [] );
  
  useEffect( (): void =>
  {
    const fetchCategories = async (): Promise<void> =>
    {
      const result: Category[] = await getCategories();
      setCategories( result );
    };
    
    fetchCategories().then();
  }, [] );
  
  return (
    <Widget title={"Categories"}>
      <div
        className="grid w-full bg-inherit gap-x-0 items-stretch gap-4"
        style={{gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))"}}
      >
        {categories?.map( ( c: Category, i: number ) =>
          ( <Link
            className="inline-block text-center text-decoration-none grid-row-1 mb-10 px-6 text-blue-800 hover:scale-125 transition"
            key={i}
            href={`/${c.name.toLowerCase()}/`}
          >
            <Avatar className="w-[88px] h-[88px] flex-shrink-0 mx-auto block">
              <AvatarImage src={c.image || undefined} />
              <AvatarFallback className={"bg-popover"}>
                <FaCat className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <span className="text-base font-bold inline-flex justify-center text-center">{c.name.trim()}</span>
          </Link> ) )
        }
      </div>
    </Widget>
  );
}