import { ReactNode } from "react";

interface WidgetProps
{
  title?: string;
  children: ReactNode;
}

export function Widget ( { children, title }: WidgetProps ): JSX.Element
{
  return (
    <div className="w-[calc(100% - 24px)] m-[12px] bg-muted rounded-xl p-5 pt-10 shadow-md">
      {title && (
        <h2 className="text-[32px] leading-[34px] font-bold text-center text-primary mb-[56px]">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}