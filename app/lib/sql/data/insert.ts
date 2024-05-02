import { User } from "@/app/lib/definitions";
import { execQuery } from "@/app/lib/sql/sql";
import { insertUser } from "@/app/lib/sql/constants/queries";

export async function insertRegisteredUser ( user: User ): Promise<void>
{
  await execQuery<undefined>( insertUser, [ user.id, user.username, user.email, user.password ] );
  //await execQuery<undefined>(  )
}