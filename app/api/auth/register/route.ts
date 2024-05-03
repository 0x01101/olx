import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { execQuery } from "@/app/lib/sql/sql";
import { Role } from "@/app/lib/definitions";

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
      return NextResponse.json( { success: false, message: "Invalid credentials format" }, { status: 400 } );
    }
    
    const hashedPassword: string = await hash( parsedCredentials.data.password, 10 );
    
    await execQuery<undefined>( `
        insert into
          users (email, password)
        values
          (?, ?);`,
      [ parsedCredentials.data.email, hashedPassword ],
    );
    
    await execQuery<undefined>( `
        insert into
          user_info (username, name, role)
        values
          (?, ?, ?);`,
      [ parsedCredentials.data.email, parsedCredentials.data.email.replace( /@.*$/img, "" ), Role.USER ],
    );
  }
  catch ( e: any )
  {
    console.log( e );
  }
  
  return NextResponse.json( { success: true } );
}