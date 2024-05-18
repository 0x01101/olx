"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { UserCreateCard } from "@/components/dashboard/users/user-create-card";
import { UserCard } from "@/components/dashboard/users/user-card";
import { deleteUser } from "@/actions/delete";
import { ServerResponse } from "@/lib/definitions";
import { z } from "zod";
import { SimpleUserUpdateSchema } from "@/schemas";
import { updateUser } from "@/actions/update";
import { useSession } from "next-auth/react";

interface UsersProps
{
  users: User[];
}

export function Users ( { users: us }: UsersProps ): JSX.Element
{
  const session = useSession();
  
  const [ users, setUsers ] = useState<User[]>( us );
  
  const deleteCallback = async ( { id }: { id: string } ): Promise<void> =>
  {
    const response: ServerResponse = await deleteUser( { id } );
    if ( response.success ) setUsers( users.filter( ( user: User ): boolean => user.id !== id ) );
    await session.update();
  };
  
  const updateCallback = async ( user: z.infer<typeof SimpleUserUpdateSchema> & { id: string } ): Promise<void> =>
  {
    const { updated }: ServerResponse & { updated?: User } = await updateUser( user );
    if ( updated )
      setUsers( users.map( ( u: User ): User => u.id === user.id ? updated : u ) );
    await session.update();
  };
  
  return (
    <div
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      className={"grid w-full h-full items-start gap-4"}
    >
      {users.map( ( user: User, index: number ): JSX.Element => (
        <UserCard
          key={index}
          user={user}
          deleteHandler={deleteCallback}
          editHandler={updateCallback}
        />
      ) )}
      <UserCreateCard />
    </div>
  );
}