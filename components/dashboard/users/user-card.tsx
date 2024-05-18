"use client";

import { User } from "@prisma/client";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Cross2Icon, DashIcon, Link1Icon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { UserAvatar } from "@/components/auth/user-avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SimpleUserUpdateSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import isEqual from "react-fast-compare";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { capitalize } from "@/lib/text";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { isEmpty } from "@/lib/arrays";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";

interface UserCardProps
{
  user: User;
  deleteHandler?: ( user: { id: string } ) => void;
  editHandler?: ( user: z.infer<typeof SimpleUserUpdateSchema> & { id: string } ) => void;
}

export function UserCard ( { user, deleteHandler, editHandler }: UserCardProps ): JSX.Element
{
  const session = useSession();
  
  const [ folded, setFolded ] = useState<boolean>( false );
  const [ isPending, startTransition ] = useTransition();
  const [ changed, setChanged ] = useState<string[]>( [] );
  
  const defaultValues = useMemo( () => ( {
    name:               user.name ?? undefined,
    email:              user.email ?? undefined,
    role:               user.role,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
  } ), [ user ] );
  
  const form = useForm<z.infer<typeof SimpleUserUpdateSchema>>( {
    resolver: zodResolver( SimpleUserUpdateSchema ),
    defaultValues,
  } );
  
  const formValues = form.watch();
  
  useEffect( () =>
  {
    const changedFields: string[] = [];
    
    for ( const key in formValues )
      if ( formValues[ key as keyof typeof formValues ] !== defaultValues[ key as keyof typeof defaultValues ] )
        changedFields.push( key );
    
    if ( !isEqual( changed, changedFields ) )
      setChanged( changedFields );
  }, [ formValues, defaultValues, changed ] );
  
  const onSubmit = async ( values: z.infer<typeof SimpleUserUpdateSchema> ): Promise<void> =>
  {
    startTransition( async (): Promise<void> =>
    {
      if ( editHandler !== undefined ) editHandler( { ...values, id: user.id } );
    } );
  };
  
  return (
    <div className={cn(
      "bg-popover rounded-md p-2 flex flex-col w-[225px] shadow-md items-center space-y-2",
      user.id === session.data?.user?.id ? "shadow-emerald-600" : "",
    )}>
      <div className={"flex flex-row-reverse mb-1 w-full"}>
        {deleteHandler !== undefined && ( <AlertDialog>
          <AlertDialogTrigger asChild>
            <Cross2Icon
              className={"w-5 h-5 bg-red-600 text-red-600 hover:text-white transition-all rounded-full cursor-pointer ml-1"} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                user and remove its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteHandler( user )}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> )}
        <DashIcon
          className={"w-5 h-5 bg-orange-600 text-orange-600 hover:text-white transition-all rounded-full cursor-pointer"}
          onClick={() => setFolded( !folded )}
        />
        <div className="mr-auto">
          <div className={"flex flex-row space-x-4"}>
            <Link href={`/user/${user.id}`}>
              <Link1Icon
                className={"w-5 h-5 bg-blue-600 text-blue-600 hover:text-white transition-all rounded-full cursor-pointer"} />
            </Link>
            {user.id === session.data?.user?.id ?
              <p className={"font-bold"}>Current user</p>
              : <></>}
          </div>
        </div>
      </div>
      {!folded && (
        <>
          <UserAvatar user={user} variant={"large"} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit( onSubmit )}
              className={"space-y-1"}
            >
              <FormField
                control={form.control}
                name={"name"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        readOnly={editHandler === undefined}
                        className={changed.includes( field.name ) ? "border-emerald-700" : ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"email"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        readOnly={editHandler === undefined}
                        className={changed.includes( field.name ) ? "border-emerald-700" : ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"role"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={editHandler === undefined}
                      >
                        <SelectTrigger className={changed.includes( field.name ) ? "border-emerald-700" : ""}>
                          <SelectValue placeholder={"Role"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[ "USER", "ADMIN" ].map( ( state: string, index: number ) => (
                              <SelectItem key={index} value={state}>
                                {capitalize( state )}
                              </SelectItem>
                            ) )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"isTwoFactorEnabled"}
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>2FA Enabled</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={( value ) => field.onChange( value === "1" )}
                        defaultValue={field.value ? "1" : "0"}
                        disabled={editHandler === undefined}
                      >
                        <SelectTrigger className={changed.includes( field.name ) ? "border-emerald-700" : ""}>
                          <SelectValue placeholder={"2FA Enabled"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"1"}>
                              Enabled
                            </SelectItem>
                            <SelectItem value={"0"}>
                              Disabled
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={"flex flex-row space-x-3 mt-1 text-xs items-center justify-center"}>
                <div className={"flex flex-col space-y-1"}>
                  <p>Created</p>
                  <p>Updated</p>
                </div>
                <div className={"flex flex-col space-y-1"}>
                  <p className={"text-white/75"}>{formatDate(user.createdAt)}</p>
                  <p className={"text-white/75"}>{formatDate(user.updatedAt)}</p>
                </div>
              </div>
              {!isEmpty( changed ) && (
                <Button
                  type={"submit"}
                  className={"w-full"}
                  disabled={editHandler === undefined}
                >
                  Save
                </Button>
              )}
            </form>
          </Form>
        </>
      )}
    </div>
  );
}