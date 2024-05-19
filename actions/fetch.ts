"use server";

import { Category, Notifications } from "@prisma/client";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { ExtendedUser } from "@/next-auth";

export const getCategories = (): Promise<Category[]> => db.category.findMany();
export const getNotifications = async (): Promise<Notifications[]> =>
{
  const user: ExtendedUser | undefined = ( await auth() )?.user;
  if ( !user ) return [];
  return db.notifications.findMany( {
    where: {
      userId: user.id,
    },
  } );
};