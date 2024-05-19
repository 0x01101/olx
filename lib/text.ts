export const capitalize = ( str: string, ignoreCasing: boolean = true ): string =>
{
  str = ignoreCasing ? str?.toLowerCase() : str;
  return str?.charAt( 0 )?.toUpperCase() + str?.slice( 1 );
};
