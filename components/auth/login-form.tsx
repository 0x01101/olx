import { CardWrapper } from "@/components/auth/card-wrapper";

export function LoginForm (): JSX.Element
{
  return (
    <CardWrapper
      headerLabel={"Welcome back"}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={"/auth/register"}
      showSocial>
      Login form
    </CardWrapper>
  );
}