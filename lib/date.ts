import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend( relativeTime );
dayjs.extend( localizedFormat );
dayjs.extend( isToday );
dayjs.extend( isYesterday );
dayjs.extend( weekOfYear );

export function formatDate ( date: Date ): string
{
  const now: Dayjs = dayjs();
  const givenDate: Dayjs = dayjs( date );
  
  if ( givenDate.isToday() )
    return `Today at ${givenDate.format( "HH:mm" )}`;
  if ( givenDate.isYesterday() )
    return `Yesterday at ${givenDate.format( "HH:mm" )}`;
  if ( now.week() === givenDate.week() )
    return `${givenDate.format( "dddd" )} at ${givenDate.format( "HH:mm" )}`;
  return givenDate.format( "dddd, MMMM D" );
}