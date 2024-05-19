interface PageProps
{
  params: {
    userId: string
  };
}

export default async function Page ( { params }: PageProps ): Promise<JSX.Element>
{
  return (
    <>
      {/* TODO */}
      {params.userId}
    </>
  );
}