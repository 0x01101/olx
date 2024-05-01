import { User } from "@/app/lib/definitions";

export async function fetchUserByEMail ( email: string ): Promise<User | null>
{
  const rows = await db.query<User>( `SELECT * FROM users WHERE email = ?`, [ email ] );
}