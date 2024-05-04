"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";

export function NewVerificationForm (): JSX.Element
{
  return (
    <CardWrapper headerLabel={"Confirming your verification"} backButtonLabel={"Back to login"}
                 backButtonHref={"/auth/login"}>
      <div className={"flex items-center w-full justify-center"}>
      
      </div>
    </CardWrapper>
  );
}