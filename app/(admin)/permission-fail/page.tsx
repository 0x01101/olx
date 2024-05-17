export default async function Page (): Promise<JSX.Element>
{
  return (
    <div className={"flex items-center justify-center h-full"}>
      <h1 className={"text-4xl font-semibold text-center"}>
        You do not have permission to view this page
      </h1>
    </div>
  );
}