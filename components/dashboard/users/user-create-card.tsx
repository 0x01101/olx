"use client";

import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

export function UserCreateCard (): JSX.Element
{
  return (
    <div className={"bg-popover rounded-md p-2 flex w-[225px] shadow-md items-center justify-center self-stretch"}>
      <Link href={"/auth/register"}>
        <div className={"flex w-[150px] h-[150px] bg-emerald-600 rounded-3xl items-center justify-center"}>
          <PlusIcon className={"w-16 h-16"} />
        </div>
      </Link>
    </div>
  );
}