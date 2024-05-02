import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { execQuery } from "@/app/lib/sql/sql";

export async function POST ( request: Request )
{
  try
  {
    const { email, password }: { email: string, password: string } = await request.json();
    
    const parsedCredentials = z
    .object( { email: z.string().email(), password: z.string().min( 6 ) } )
    .safeParse( { email, password } );
    
    if ( !parsedCredentials.success )
    {
      return NextResponse.json( { message: "Invalid credentials format" }, { status: 400 } );
    }
    
    const hashedPassword: string = await hash( parsedCredentials.data.password, 10 );
    
    await execQuery<undefined>( `
        insert into
          users (users.email, users.password)
        values
          (?, ?);`,
      [ parsedCredentials.data.email, hashedPassword ],
    );
  }
  catch ( e: any )
  {
    console.log( e );
  }
  
  return NextResponse.json( { message: "OK" } );
}