export function signupTemplate(
  appName: string,
  receiverName: string,
): { subject: string; html: string } {
  const subject = `Welcome to ${appName}`;
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Total Health</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f9; padding:48px 20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px; background:#ffffff; border-radius:16px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:24px 36px; border-bottom:1px solid #f0f0f0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="" alt="Total Health" style="height:44px; width:auto; display:block;" />
                  </td>
                  <td style="text-align:right; vertical-align:middle;">
                    <a href="https://www.linkedin.com/" style="display:inline-block; margin-left:10px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#b0b0b0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://x.com/" style="display:inline-block; margin-left:10px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#b0b0b0"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="https://web.facebook.com/" style="display:inline-block; margin-left:10px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#b0b0b0"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/" style="display:inline-block; margin-left:10px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#b0b0b0"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #5B6EF5 0%, #4254d4 100%); padding:48px 36px; text-align:center;">
              <!-- Icon -->
              <div style="display:inline-block; background:rgba(255,255,255,0.15); border-radius:50%; width:60px; height:60px; line-height:60px; text-align:center; margin-bottom:16px;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle; margin-top:16px;">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
                </svg>
              </div>
              <h1 style="margin:0 0 8px; color:#ffffff; font-size:26px; font-weight:800; letter-spacing:-0.5px;">Welcome to Total Health</h1>
              <p style="margin:0; color:rgba(255,255,255,0.75); font-size:14px; line-height:1.5;">Your health journey starts here</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 36px 32px;">
              <p style="margin:0 0 16px; font-size:16px; font-weight:600; color:#111827;">Hi ${receiverName} 👋</p>
              <p style="margin:0 0 16px; font-size:15px; color:#4b5563; line-height:1.7;">
                Welcome aboard! Your health profile is ready. Start tracking your wellness, managing your records, and taking control of your health — all in one place.
              </p>
              <p style="margin:0 0 32px; font-size:15px; color:#4b5563; line-height:1.7;">
                If you ever need help, the Total Health team is right here to guide you every step of the way.
              </p>

              <!-- Feature highlights -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                <tr>
                  <td width="33%" style="padding:16px 8px 16px 0; vertical-align:top;">
                    <div style="background:#f0f3ff; border-radius:10px; padding:16px; text-align:center;">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#5B6EF5" style="margin-bottom:8px; display:block; margin-left:auto; margin-right:auto;"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 3a4 4 0 110 8 4 4 0 010-8zm0 10c-3.33 0-6 1.34-6 3h12c0-1.66-2.67-3-6-3z"/></svg>
                      <p style="margin:0; font-size:12px; font-weight:600; color:#374151;">Hospital</p>
                    </div>
                  </td>
                  <td width="33%" style="padding:16px 4px; vertical-align:top;">
                    <div style="background:#f0f3ff; border-radius:10px; padding:16px; text-align:center;">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#5B6EF5" style="margin-bottom:8px; display:block; margin-left:auto; margin-right:auto;"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                      <p style="margin:0; font-size:12px; font-weight:600; color:#374151;">Pharmacy</p>
                    </div>
                  </td>
                  <td width="33%" style="padding:16px 0 16px 8px; vertical-align:top;">
                    <div style="background:#f0f3ff; border-radius:10px; padding:16px; text-align:center;">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#5B6EF5" style="margin-bottom:8px; display:block; margin-left:auto; margin-right:auto;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                      <p style="margin:0; font-size:12px; font-weight:600; color:#374151;">Patient</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <p style="margin:0 0 4px; font-size:14px; color:#9ca3af;">Thanks,</p>
              <p style="margin:0 0 36px; font-size:15px; font-weight:700; color:#111827;">The Total Health Team</p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr><td style="border-top:1px solid #f0f0f0;"></td></tr>
              </table>

              <!-- App download -->
              <p style="margin:0 0 16px; font-size:14px; font-weight:600; color:#111827; text-align:center;">Get the app</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="#" style="display:inline-block; margin:0 6px;">
                      <img src="https://res.cloudinary.com/dlyb5lech/image/upload/v1776167732/google-play_hv6ohh_up1f1p.png" alt="Get it on Google Play" style="height:36px; width:auto; display:block;">
                    </a>
                    <a href="#" style="display:inline-block; margin:0 6px;">
                      <img src="https://res.cloudinary.com/dlyb5lech/image/upload/v1776167742/app-store_bka4d7_iifres.png" alt="Download on the App Store" style="height:36px; width:auto; display:block;">
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; border-top:1px solid #f0f0f0; padding:24px 36px; text-align:center;">
              <p style="margin:0 0 6px; font-size:12px; color:#9ca3af; line-height:1.6;">
                Questions? Email us at <a href="mailto:support@geodevcodes.dev" style="color:#5B6EF5; text-decoration:none;">support@geodevcodes.dev</a>
              </p>
              <p style="margin:0 0 6px; font-size:12px; color:#9ca3af; line-height:1.6;">
                <a href="#" style="color:#9ca3af; text-decoration:none;">Unsubscribe</a> · <a href="#" style="color:#9ca3af; text-decoration:none;">Email preferences</a>
              </p>
              <p style="margin:0; font-size:12px; color:#c4c9d4;">
                Total, 313 Magodo Brooks Estate, Lagos, Nigeria &nbsp;·&nbsp; © 2025 Total Health
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
  return { subject, html };
}
