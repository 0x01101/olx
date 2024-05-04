import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth"
{
  interface Session
  {
    user: {
      role: UserRole
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt"
{
  interface JWT {
    role?: UserRole;
  }
}