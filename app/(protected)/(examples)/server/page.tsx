import { currentUser } from "@/lib/auth";
import { ExtendedUser } from "@/next-auth";

export default async function Page (): Promise<JSX.Element>
{
  const user: ExtendedUser | undefined = await currentUser();
  
  return (
    <div>
      {JSON.stringify( user )}
    </div>
  );
}