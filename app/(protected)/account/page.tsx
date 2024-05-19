import { UserDashboard } from "@/components/auth/user-dashboard";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <UserDashboard />
  );
}