"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

interface PreviewableImageProps
{
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  layout?: "fill" | "responsive" | "intrinsic" | undefined;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down" | undefined;
}

export function PreviewableImage ( { src, alt, className, ...props }: PreviewableImageProps ): JSX.Element
{
  const [ showImage, setShowImage ] = useState<boolean>( false );
  
  return (
    <>
      {showImage && (
        <div
          className={"fixed inset-0 z-[10000] flex items-center justify-center w-screen h-screen bg-black"}
        >
          <IoClose className={"w-10 h-10 top-0 right-0 absolute cursor-pointer z-[99999]"}
                   onClick={() => setShowImage( false )} />
          <div className={"flex flex-row space-x-4 items-center justify-center w-full h-full"}>
            <div className="max-w-screen max-h-screen">
              <Image src={src} alt={alt} layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        onClick={() => setShowImage( !showImage )}
        className={cn( className, "cursor-pointer" )}
        {...props}
      />
    </>
  );
}