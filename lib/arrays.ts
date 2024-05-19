export function splitIntoChunks<T> ( array: T[], chunkSize: number ): T[][]
{
  const result: T[][] = [];
  for ( let i = 0 ; i < array.length ; i += chunkSize )
    result.push( array.slice( i, i + chunkSize ) );
  return result;
}

export const isEmpty = (
  array: any[] | null | undefined | { length: number },
): boolean => !!array && array.length === 0;

export const removeDupes = <T> ( arr: T[] ): T[] => arr.filter( ( item: T, index: number ): boolean => arr.indexOf( item ) === index );