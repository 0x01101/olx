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
    subject: `Confirm your email on ${process.env.SELF_URL?.replace( /^https?:\/\//img, "" )}`,
    html:    `
    <!DOCTYPE html>
    <!-- HTML "Borrowed" from resend's verification E-Mail -->
<html lang="en">
<head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
</head>
<body style="background-color:#000000;margin:0 auto">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:480px;border-radius:5px;margin:0 auto 40px;padding:20px">
        <tbody>
            <tr style="width:100%">
                <td>
                    <img alt="Furry :3" height="64" src="https://j3rzy.dev/images/Furry.jpg" style="display:block;outline:none;border:none;text-decoration:none;margin:64px 0 56px" width="64"/>
                    <p style="font-size:24px;line-height:40px;margin:0 0 20px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;color:#FFFFFF;font-weight:600">Confirm your account</p>
                    <p style="font-size:14px;line-height:24px;margin:0 0 40px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;color:#AAAAAA">Thank you for signing up! To confirm your account, please follow the button below.</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin:0 0 40px">
                        <tbody>
                            <tr>
                                <td>
                                    <a href="${confirmLink}" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;background-color:#FFFFFF;border-radius:8px;color:#0B0B0F;font-size:14px;font-weight:600;text-align:center;width:200px;padding:16px 20px 16px 20px" target="_blank">
                                        <span></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0;mso-text-raise:12px">Confirm Account</span><span></span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="font-size:14px;line-height:24px;margin:0 0 40px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;color:#AAAAAA">
                    85 Holly Street, Clifton<br/>
                    NJ 07013, United States of America<br/>
                    ${dayjs( new Date() ).format( "LLL" )}
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
    `,
  } );
}