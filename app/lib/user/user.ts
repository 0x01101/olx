import { User } from "@/app/lib/definitions";
import { v4 } from "uuid";

/* TODO: Remove */
let testUser: User = {
  role:                 "user",
  id:                   -1,
  uuid:                 v4(),
  created_at:           new Date(),
  password:             "test",
  email:                "test@j3rzy.dev",
  username:             "test",
  watched_category_ids: [],
};

export async function getUser (): Promise<User>
{
  /* TODO */
  return testUser;
}

export async function modifyUser ( newUser: User ): Promise<boolean>
{
  /* TODO */
  testUser = newUser;
  return true;
}