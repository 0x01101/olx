import { auth } from "@/auth";
import { Session } from "next-auth";
import { ExtendedUser } from "@/next-auth";

export async function currentUser (): Promise<ExtendedUser | undefined>
{
  const session: Session | null = await auth();
  
  return session?.user;
}