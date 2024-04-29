"use server";

import { getUser, modifyUser } from "@/app/lib/user/user";
import { Category, User } from "@/app/lib/definitions";

export async function setWatchingAction ( watching: boolean, category: Category ): Promise<void>
{
  const oldUser: User = await getUser();
  const includes: boolean = oldUser.watched_category_ids.includes( category.id );
  
  if ( watching && !includes )
    oldUser.watched_category_ids.push( category.id );
  else if ( !watching && includes )
    oldUser.watched_category_ids = oldUser.watched_category_ids.filter( id => id !== category.id );
  
  await modifyUser( oldUser );
}