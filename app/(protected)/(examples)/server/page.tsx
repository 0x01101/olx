import { currentUser } from "@/lib/auth";

export default async function Page (): Promise<JSX.Element>
{
  const user = await currentUser();
  
  return (
    <div>
      {JSON.stringify( user )}
    </div>
  );
}