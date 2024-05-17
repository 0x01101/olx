"use server";

import { auth } from "@/auth";
import { ExtendedUser } from "@/next-auth";
import { db } from "@/lib/db";

export async function markAsRead (ids: string | string[]): Promise<void>
{
  if (typeof ids === "string") ids = [ids];
  const user: ExtendedUser | undefined = (await auth())?.user;
  if (!user) return;
  await db.notifications.updateMany({
    where: {
      userId: user.id,
      id: {
        in: ids,
      },
    },
    data: {
      read: true,
    },
  });
}