import { NextResponse } from "next/server";

export async function POST ( request: Request )
{
  try
  {
    const { email, password } = await request.json();
    // Validate
    console.log( email, password );
  }
  catch ( e: any )
  {
    console.log( e );
  }
  
  return NextResponse.json( { message: "OK" } );
}