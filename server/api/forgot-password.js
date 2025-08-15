import { PrismaClient } from '#prisma';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const RESEND_API_KEY = process.env.RESEND_API;

// Initialize Resend
const resend = new Resend(RESEND_API_KEY);

// Function to send reset password email using Resend
const sendResetEmail = async (to, resetUrl, userName) => {
  // Render the email template
  // const emailElement = React.createElement(ResetPasswordEmail, { resetUrl, userName });
  // const emailHtml = ReactDOMServer.renderToStaticMarkup(emailElement);
  
  const currentYear = new Date().getFullYear();

  const emailHtml=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
    <head>
      <link
        rel="preload"
        as="image"
        href="https://ne-to.com/logo-full.png" />
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta name="x-apple-disable-message-reformatting" />
    </head>
    <body style="background-color:#f6f9fc;padding:10px 0">
      <div
        style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
        Нууц үг сэргээх | NE-TO cargo
        <div>
        </div>
      </div>
      <table
        align="center"
        width="100%"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="max-width:32rem;background-color:#ffffff;border-radius: 16px;padding:32px">
        <tbody>
          <tr style="width:100%">
            <td>
              <img
                alt="ne-to"
                height="32"
                src="https://ne-to.com/logo-full.png"
                style="display:block;outline:none;border:none;text-decoration:none"
                width="123" />
              <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation">
                <tbody>
                  <tr>
                    <td>                    
                    <p
                        style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">
                        Сайн уу, ${userName}
                      </p>
                      <p
                        style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">
                        Та нууц үг сэргээх хүсэлт илгээсэн байна. Доорх товч дээр дарж нууц үгээ сэргээнэ үү:
                      </p>
                      <a
                        href="${resetUrl}"
                        style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#007ee6;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-align:center;width:210px;padding:14px 7px 14px 7px"
                        target="_blank"
                        ><span
                          style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px"
                          >Нууц үг сэргээх</span
                        ></a
                      >
                      <p
                        style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">
                        Хэрэв та энэ хүсэлтийг илгээгээгүй бол бидэнд хандана уу.
                      </p>
                      <p
                        style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">
                        © ${currentYear} NE-TO cargo. Бүх эрх хуулиар хамгаалагдсан.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: 'NE-TO Security <security@mail.ne-to.com>',
      to: [to],
      subject: 'Нууц үг сэргээх | NE-TO cargo',
      html: emailHtml
    });
    
    console.log(emailHtml)

    if (error) {
      console.error('Error sending reset password email:', error);
      throw new Error('Failed to send reset password email');
    }

    console.log('Reset password email sent successfully:', data);
  } catch (error) {
    console.error('Resend email error:', error);
    throw new Error('Failed to send reset password email');
  }
};

// Function to mask email
const maskEmail = (email) => {
  if (!email) return '';
  const [username, domain] = email.split('@');
  const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
  return `${maskedUsername}@${domain}`;
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { phoneNumber } = body;

    if (!phoneNumber) {
      throw createError({
        statusCode: 400,
        message: 'Phone number is required'
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true
      }
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'Бүртгэлгүй дугаар байна'
      });
    }

    if (!user.email) {
      throw createError({
        statusCode: 400,
        message: 'Бүртгэлтэй имэйл хаяг олдсонгүй'
      });
    }

    // Generate JWT token for password reset
    const token = jwt.sign(
      { userId: user.id, type: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Create the reset URL
    const resetUrl = `${BASE_URL}/reset-password/${token}`;

    // Send reset password email
    await sendResetEmail(user.email, resetUrl, user.name);

    return {
      success: true,
      message: 'Password reset link has been sent',
      maskedEmail: maskEmail(user.email)
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'An error occurred while processing your request'
    });
  }
});
