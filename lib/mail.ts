import { Resend } from "resend";

const resend: Resend = new Resend( process.env.RESEND_API_KEY );

export async function sendVerificationEmail ( email: string, token: string ): Promise<void>
{
  const confirmLink: string = `${process.env.SELF_URL}/auth/new-verification?token=${token}`;
}