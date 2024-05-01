import { z } from "zod";
import { UserRecord } from "@/app/lib/sql/types/definitions";
import { User } from "@/app/lib/definitions";

export const userSchema = z.object( {
  id:       z.number(),
  username: z.string().min( 2 ),
  email:    z.string().email(),
  password: z.string().min( 6 ),
} ).transform( ( user: UserRecord ): User => ( {
  id:       `${user.id}`,
  username: user.username,
  email:    user.email,
  password: user.password,
} ) );