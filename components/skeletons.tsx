import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton (): JSX.Element
{
  return (
    <div className="w-full m-0 mx-auto bg-white py-14 rounded">
      <div className="flex justify-center">
        <Skeleton className="h-[34px] mb-[56px] w-[220px] flex-shrink-0 block rounded-xl" />
      </div>
      <div className="grid w-full bg-inherit grid-cols-9 gap-x-0 items-stretch">
        {[ ...Array( 18 ) ].map( ( _, index: number ) => (
          <div key={index} className="flex flex-col items-center mb-10">
            <Skeleton className="w-[88px] h-[88px] rounded-full flex-shrink-0 mx-auto block" />
            <Skeleton className="h-4 w-[69px] mt-1" />
          </div>
        ) )}
      </div>
    </div>
  );
}