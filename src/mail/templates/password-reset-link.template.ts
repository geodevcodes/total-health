export function passwordResetLinkEmailContent(
  appName: string,
  resetLink: string,
): { subject: string; html: string } {
  const subject = `Reset your ${appName} password`;
  const safeLink = escapeHtml(resetLink);
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f9; padding: 40px 20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header accent bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 32px 40px; text-align:center;">
              <!-- Lock icon (SVG inline) -->
              <div style="display:inline-block; background:rgba(255,255,255,0.15); border-radius:50%; width:56px; height:56px; line-height:56px; text-align:center; margin-bottom:12px;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle; margin-top:15px;">
                  <path d="M12 1C9.24 1 7 3.24 7 6v2H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2h-2V6c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3zm0 9a2 2 0 110 4 2 2 0 010-4z" fill="#ffffff"/>
                </svg>
              </div>
              <div style="color:#ffffff; font-size:22px; font-weight:700; letter-spacing:-0.3px;">Password Reset</div>
              <div style="color:rgba(255,255,255,0.75); font-size:13px; margin-top:4px;">${escapeHtml(appName)}</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 40px 28px;">
              <p style="margin:0 0 8px; font-size:16px; font-weight:600; color:#111827;">Hi there,</p>
              <p style="margin:0 0 24px; font-size:15px; color:#4b5563; line-height:1.6;">
                We received a request to reset the password for your <strong style="color:#111827;">${escapeHtml(appName)}</strong> account. Click the button below to choose a new one.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <a href="${safeLink}"
                      style="display:inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 36px; border-radius:8px; letter-spacing:0.2px; box-shadow: 0 2px 8px rgba(37,99,235,0.35);">
                      Reset My Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="border-top:1px solid #e5e7eb;"></td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="margin:0 0 6px; font-size:12px; color:#9ca3af; text-transform:uppercase; letter-spacing:0.6px; font-weight:600;">Or copy this link into your browser</p>
              <p style="margin:0 0 24px; font-size:12px; color:#6b7280; word-break:break-all; background:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; padding:10px 12px; font-family:monospace;">
                ${safeLink}
              </p>

              <!-- Warning box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#fff7ed; border-left:3px solid #f97316; border-radius:0 6px 6px 0; padding:12px 16px;">
                    <p style="margin:0; font-size:13px; color:#92400e; line-height:1.5;">
                      ⏱ <strong>This link expires in 30 minutes.</strong> If you didn't request a password reset, you can safely ignore this email — your password won't change.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:20px 40px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#9ca3af; line-height:1.6;">
                This email was sent by <strong style="color:#6b7280;">${escapeHtml(appName)}</strong>.<br/>
                If you have trouble, contact our support team.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
  return { subject, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
