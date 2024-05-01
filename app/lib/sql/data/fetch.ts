import { User } from "@/app/lib/definitions";
import { execQuery, mergeQuery } from "@/app/lib/sql/sql";
import { UserRecord } from "@/app/lib/sql/types/definitions";
import { user } from "@/app/lib/sql/constants/queries";
import { userSchema } from "@/app/lib/sql/types/schemas";
import { SafeParseReturnType } from "zod";

export async function fetchUserByEMail ( email: string ): Promise<User | undefined>
{
  const rows: UserRecord[] = await execQuery<UserRecord>( mergeQuery( user, `WHERE email = ?` ), [ email ] );
  if ( !rows.length ) return undefined;
  const parsed: SafeParseReturnType<UserRecord, User> = userSchema.safeParse( rows[ 0 ] );
  if ( !parsed.success ) return undefined;
  return parsed.data;
}