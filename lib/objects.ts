function removeUndefinedValues ( obj: Record<string, unknown> ): Record<string, unknown>
{
  return Object.entries( obj ).reduce( ( newObj: Record<string, unknown>, [ key, value ] ) =>
  {
    if ( value !== undefined )
    {
      newObj[ key ] = value;
    }
    return newObj;
  }, {} );
}