import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface WidgetProps
{
  title?: string;
  children: ReactNode;
  className?: ClassValue;
}

export function Widget ( { children, title, className }: WidgetProps ): JSX.Element
{
  return (
    <div className={cn( "w-[calc(100% - 24px)] m-[12px] bg-muted rounded-xl p-5 shadow-md1", title ? "pt-10" : "" )}>
      {title && (
        <h2 className={"text-[32px] leading-[34px] font-bold text-center text-primary mb-[56px]"}>
          {title}
        </h2>
      )}
      <div className={cn("w-full h-full", className)}>
        {children}
      </div>
    </div>
  );
}