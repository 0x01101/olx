import { Skeleton } from "@/components/ui/skeleton";
import { Widget } from "@/components/widget";

export function CategoriesSkeleton (): JSX.Element
{
  return (
    <Widget>
      <div className="flex justify-center">
        <Skeleton className="h-[34px] mb-[56px] w-[220px] flex-shrink-0 block rounded-xl" />
      </div>
      <div
        className="grid w-full bg-inherit gap-x-0 items-stretch gap-4"
        style={{gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))"}}
      >
        {[ ...Array( 24 ) ].map( ( _, index: number ) => (
          <div key={index} className="flex flex-col items-center mb-10">
            <Skeleton className="w-[88px] h-[88px] rounded-full flex-shrink-0 mx-auto block" />
            <Skeleton className="h-4 w-[69px] mt-1" />
          </div>
        ) )}
      </div>
    </Widget>
  );
}