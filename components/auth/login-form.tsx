"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";
import { ServerResponse } from "@/lib/definitions";

export function LoginForm (): JSX.Element
{
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const urlError: string = searchParams.get( "error" ) === "OAuthAccountNotLinked" ? "Email already in use with different provider" : "";
  
  const [ showTwoFactor, setShowTwoFactor ] = useState<boolean>( false );
  const [ error, setError ] = useState<string | undefined>( "" );
  const [ success, setSuccess ] = useState<string | undefined>( "" );
  const [ isPending, startTransition ] = useTransition();
  
  const form = useForm<z.infer<typeof LoginSchema>>( {
    resolver:      zodResolver( LoginSchema ),
    defaultValues: {
      email:    "",
      password: "",
    },
  } );
  
  const onSubmit = async ( values: z.infer<typeof LoginSchema> ): Promise<void> =>
  {
    setError( "" );
    setSuccess( "" );
    
    startTransition( async (): Promise<void> =>
    {
      const response: ServerResponse & { twoFactor?: boolean } = await login( values );
      if ( response.error )
      {
        form.reset();
        setError( response.error );
      }
      
      if ( response.success )
      {
        form.reset();
        setSuccess( response.success );
      }
      
      if ( response.twoFactor )
      {
        setShowTwoFactor( true );
      }
    } );
  };
  
  return (
    <CardWrapper
      headerLabel={"Welcome back"}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={"/auth/register"}
      showSocial>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit( onSubmit )}
          className={"space-y-6"}
        >
          <div className={"space-y-4"}>
            {showTwoFactor && (
              <FormField
                control={form.control}
                name={"code"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder={"123456"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name={"email"}
                  render={( { field } ) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={"john.smith@example.com"}
                          type={"email"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"password"}
                  render={( { field } ) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={"********"}
                          type={"password"}
                        />
                      </FormControl>
                      <Button
                        size={"sm"}
                        variant={"link"}
                        asChild
                        className={"px-0 font-normal"}
                      >
                        <Link href={"/auth/reset"}>
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type={"submit"}
            className={"w-full"}
          >
            {showTwoFactor ? "Confirm" : "Log in"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}