"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import { useTransition } from "react";

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

export function LoginForm (): JSX.Element
{
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
    startTransition( async (): Promise<void> =>
    {
      await login( values );
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={""} />
          <FormSuccess message={""} />
          <Button
            disabled={isPending}
            type={"submit"}
            className={"w-full"}
          >
            Log in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}