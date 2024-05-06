"use client";

import Link from "next/link";
import { Category } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCat } from "react-icons/fa";

interface CategoriesProps
{
  categories: Category[];
}

export default function Categories ( { categories }: CategoriesProps ): JSX.Element
{
  return (
    <div className="w-full m-0 mx-auto bg-white py-14 rounded">
      <h2 className="text-[32px] leading-[34px] font-bold text-center text-[#002f34] mb-[56px]">
        Categories
      </h2>
      <div className="grid w-full bg-inherit grid-cols-9 gap-x-0 items-stretch">
        {categories?.map( ( c: Category, i: number ) =>
          ( <Link
            className="inline-block text-center text-decoration-none grid-row-1 mb-10 px-6 text-blue-800 hover:scale-125 transition"
            key={i}
            href={`/${c.name.toLowerCase()}/`}
          >
            <Avatar className="w-[88px] h-[88px] flex-shrink-0 mx-auto block">
              <AvatarImage src={c.image || undefined} />
              <AvatarFallback>
                <FaCat className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <span className="text-base font-bold inline-flex justify-center text-center">{c.name.trim()}</span>
          </Link> ) )
        }
      </div>
    </div>
  );
}