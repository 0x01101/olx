import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/next-auth";

export function useCurrentUser (): ExtendedUser | undefined
{
  const session = useSession();
  return session.data?.user;
}