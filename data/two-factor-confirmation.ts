import { TwoFactorConfirmation } from "@prisma/client";
import { db } from "@/lib/db";

export async function getTwoFactorConfirmationByUserId ( userId: string ): Promise<TwoFactorConfirmation | null>
{
  try
  {
    return await db.twoFactorConfirmation.findUnique( { where: { userId } } );
  }
  catch ( e: any )
  {
    return null;
  }
}