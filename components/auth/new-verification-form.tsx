"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { HashLoader } from "react-spinners";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { ServerResponse } from "@/lib/definitions";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

export function NewVerificationForm (): JSX.Element
{
  const [ error, setError ] = useState<string | undefined>();
  const [ success, setSuccess ] = useState<string | undefined>();
  
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const token: string | null = searchParams.get( "token" );
  
  const onSubmit = useCallback( async (): Promise<void> =>
  {
    if ( success || error ) return;
    
    if ( !token )
    {
      setError( "Missing token!" );
      return;
    }
    
    try
    {
      const response: ServerResponse = await newVerification( token );
      
      setSuccess( response?.success );
      setError( response?.error );
    }
    catch ( e: any )
    {
      setError( "Something went wrong!" );
    }
  }, [ token, success, error ] );
  
  useEffect( (): void =>
  {
    onSubmit().then();
  }, [ onSubmit ] );
  
  return (
    <CardWrapper
      headerLabel={"Confirming your verification"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <div className={"flex items-center w-full justify-center"}>
        {!success && !error && (
          <HashLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  );
}