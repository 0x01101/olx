import { ReactNode } from "react";

interface WidgetProps
{
  title?: string;
  children: ReactNode;
}

export function Widget ( { children, title }: WidgetProps ): JSX.Element
{
  return (
    <div className="w-[calc(100% - 24px)] my-[12px] mx-[12px] bg-muted rounded-xl p-10 py-14">
      {title && (
        <h2 className="text-[32px] leading-[34px] font-bold text-center text-primary mb-[56px]">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}