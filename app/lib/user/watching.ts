import { getUser } from "@/app/lib/user/user";
import { Category } from "@/app/lib/definitions";

export default async function isWatching ( category: Category ): Promise<boolean>
{
  return ( await getUser() ).watched_category_ids.includes( category.id );
}