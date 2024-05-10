import { Widget } from "@/components/main/widget";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <div>
      <Widget>
        <h1>Page</h1>
      </Widget>
      <Widget>
        <h1>Page</h1>
      </Widget>
    </div>
  )
}