import { ExtendedUser } from "@/next-auth";
import { Card } from "@/components/ui/card";

interface UserInfoProps
{
  user?: ExtendedUser;
  label: string;
}

export function UserInfo ( { user, label }: UserInfoProps ): JSX.Element
{
  return (
    <Card>
    
    </Card>
  )
}