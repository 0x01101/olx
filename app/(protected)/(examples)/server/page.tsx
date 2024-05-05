import { currentUser } from "@/lib/auth";
import { ExtendedUser } from "@/next-auth";
import { UserInfo } from "@/components/user-info";

export default async function Page (): Promise<JSX.Element>
{
  const user: ExtendedUser | undefined = await currentUser();
  
  return (
    <UserInfo user={user} label={"Server component"} />
  );
}