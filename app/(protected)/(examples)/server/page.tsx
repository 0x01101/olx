import { auth } from "@/auth";
import { Session } from "next-auth";

export default async function Page (): Promise<JSX.Element>
{
  const session: Session | null = await auth();
  
  return (
    <div>
      {JSON.stringify(session?.user)}
    </div>
  );
}