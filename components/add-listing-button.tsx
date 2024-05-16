"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export function AddListingButton (): JSX.Element
{
  return (
    <Link href={"/offer/create"}>
      <Button
        size={"lg"}
        variant={"outline"}
        className={"mr-2 hover:bg-sky-400 active:bg-sky-600 active:text-white"}
      >
        Add listing
      </Button>
    </Link>
  );
}