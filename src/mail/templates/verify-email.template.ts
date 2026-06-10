export function verifyEmailTemplate(
  appName: string,
  verificationCode: string,
  receiverName: string,
): { subject: string; html: string } {
  const subject = `Your ${appName} verification code`;
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f0f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f0f0; padding:48px 20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background:#ffffff; border-radius:16px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#6B46C1; padding:36px 40px; text-align:center;">
              <!-- Logo placeholder circle -->
              <div style="display:inline-block; width:52px; height:52px; border-radius:50%; background:rgba(255,255,255,0.15); line-height:52px; text-align:center; margin-bottom:14px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle; margin-top:14px;">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" fill="white"/>
                </svg>
              </div>
               <div style="color:#ffffff; font-size:22px; font-weight:700; letter-spacing:-0.3px;">Email Verification</div>
              <div style="color:rgba(255,255,255,0.75); font-size:13px; margin-top:4px;">By geodevcodes</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px 32px; text-align:center;">

              <!-- Title -->
              <h1 style="margin:0 0 10px; font-size:22px; font-weight:700; color:#1a1a1a; letter-spacing:-0.3px;">Verify your email address</h1>
              <p style="margin:0 0 32px; font-size:15px; color:#555555; line-height:1.6;">
                Hi ${receiverName}, use the code below to complete your verification. It expires in <strong style="color:#1a1a1a;">10 minutes</strong>.
              </p>

              <!-- Code block -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <div style="display:inline-block; background:#f5f0ff; border:1.5px dashed #9f7aea; border-radius:10px; padding:20px 40px;">
                      <p style="margin:0 0 4px; font-size:11px; color:#7c3aed; font-weight:600; letter-spacing:1.2px; text-transform:uppercase;">Verification Code</p>
                      <p style="margin:0; font-size:36px; font-weight:800; color:#6B46C1; letter-spacing:8px; font-family: 'Courier New', monospace;">${escapeHtml(verificationCode)}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Warning note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#fdf6ff; border-left:3px solid #9f7aea; border-radius:0 8px 8px 0; padding:12px 16px; text-align:left;">
                    <p style="margin:0; font-size:13px; color:#553c9a; line-height:1.5;">
                      🔒 If you didn't request this, you can safely ignore this email. Your account remains secure.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 48px;">
              <div style="border-top:1px solid #eeeeee;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 48px; text-align:center;">

              <!-- Social icons -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td align="center">
                    <a href="#" style="display:inline-block; margin:0 6px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#9f7aea"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="#" style="display:inline-block; margin:0 6px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#9f7aea"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" style="display:inline-block; margin:0 6px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#9f7aea"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px; font-size:12px; color:#aaaaaa; line-height:1.6;">
                Sent by <a href="mailto:support@geodevcodes.dev" style="color:#9f7aea; text-decoration:none;">support@geodevcodes.dev</a> · <a href="#" style="color:#aaaaaa; text-decoration:none;">Unsubscribe</a> · <a href="#" style="color:#aaaaaa; text-decoration:none;">Email preferences</a>
              </p>
              <p style="margin:0; font-size:12px; color:#cccccc;">
                Total Health, 313 Magodo Brooks Estate, Lagos, Nigeria
              </p>

            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;
  return { subject, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
