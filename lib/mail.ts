import { Resend } from "resend";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend( LocalizedFormat );

const resend: Resend = new Resend( process.env.RESEND_API_KEY );

export async function sendVerificationEmail ( email: string, token: string ): Promise<void>
{
  const confirmLink: string = `${process.env.SELF_URL}/auth/new-verification?token=${token}`;
  
  await resend.emails.send( {
    from:    process.env.VERIFICATION_EMAIL || "verification@j3rzy.dev",
    to:      email,
    subject: `Confirm your ${process.env.SELF_URL?.replace( /^https?:\/\//img, "" )} account`,
    html:    `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
</head>
<body style="margin:0 auto;">
  <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
    <div style="background: white; padding: 20px; border-radius: 5px; max-width: 500px; width: 100%">
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 20px">Confirm your email</h1>
      <p style="margin-bottom: 20px">Please confirm your email address by clicking the button below.</p>
      <a href="${confirmLink}" style="display: inline-block; background: #000; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none">Confirm email</a>
    </div>
  </div>
</body>
</html>
    `,
  } );
}