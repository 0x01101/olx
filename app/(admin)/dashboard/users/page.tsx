import { db } from "@/lib/db";
import { Widget } from "@/components/widget";
import { User } from "@prisma/client";
import { Users } from "@/components/dashboard/users/users";

export default async function Page (): Promise<JSX.Element>
{
  const users: User[] = await db.user.findMany();
  
  return (
    <Widget title={"Users"}>
      <Users users={users} />
    </Widget>
  );
}