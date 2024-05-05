import { auth } from "@/auth";
import { Session } from "next-auth";

export async function currentUser ()
{
  const session: Session | null = await auth();
  
  return session?.user;
}