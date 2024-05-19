import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { ExtendedUser } from "@/next-auth";
import { UserDTO } from "@/lib/definitions";
import { cn } from "@/lib/utils";

interface UserAvatarProps
{
  user?: ExtendedUser | UserDTO | null;
  variant?: "large" | "normal";
}

export function UserAvatar ( { user, variant }: UserAvatarProps ): JSX.Element
{
  return (
    <Avatar className={variant === "large" ? "w-[150px] h-[150px]" : ""}>
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback className={cn("text-white", user ? "bg-sky-400" : "bg-red-500")}>
        {user ?
          <FaUser className={variant === "large" ? "w-[100px] h-[100px]" : ""} />
          :
          <FaUserXmark className={variant === "large" ? "w-[100px] h-[100px]" : ""} />
        }
      </AvatarFallback>
    </Avatar>
  );
}