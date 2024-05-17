import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { ExtendedUser } from "@/next-auth";
import { UserDTO } from "@/lib/definitions";

interface UserAvatarProps
{
  user?: ExtendedUser | UserDTO | null;
}

export function UserAvatar ( { user }: UserAvatarProps ): JSX.Element
{
  return (
    <Avatar>
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback className={user ? "bg-sky-400" : "bg-red-500"}>
        {user ? <FaUser className={"text-white"} /> : <FaUserXmark className={"text-white"} />}
      </AvatarFallback>
    </Avatar>
  );
}