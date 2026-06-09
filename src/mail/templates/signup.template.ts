export function signupTemplate(
  appName: string,
  receiverName: string,
): { subject: string; html: string } {
  const subject = `Welcome to ${appName}`;
  const html = `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
          
          <!-- Header with Logo and Social Icons -->
          <tr>
            <td style="padding-bottom: 30px; padding-top: 30px; padding-left: 10px; padding-right: 40px; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="display: flex; align-items: center;">
                      <img src="" alt="Total Health" style="height: 80px; width: auto; display: block;">
                  </td>
                  <td style="text-align: right;">
                    <a href="https://www.linkedin.com/" style="display: inline-block; margin-left: 15px;"><img src="https://img.icons8.com/ios-filled/50/6b7280/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;"></a>
                    <a href="https://x.com/home" style="display: inline-block; margin-left: 15px;"><img src="https://img.icons8.com/ios-filled/50/6b7280/twitter.png" alt="Twitter" style="width: 24px; height: 24px;"></a>
                    <a href="https://web.facebook.com/" style="display: inline-block; margin-left: 15px;"><img src="https://img.icons8.com/ios-filled/50/6b7280/facebook.png" alt="Facebook" style="width: 24px; height: 24px;"></a>
                    <a href="https://www.instagram.com/" style="display: inline-block; margin-left: 15px;"><img src="https://img.icons8.com/ios-filled/50/6b7280/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;"></a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 50px 40px;">
              <h1 style="margin: 0 0 30px 0; font-size: 24px; font-weight: 700; color: #000000; line-height: 1.2;">Welcome to Total Health</h1>
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #000000; line-height: 1.6;">Hi ${ receiverName },</p>
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #000000; line-height: 1.6;">Welcome aboard! Your health profile is ready. Start tracking your wellness, managing your records, and taking control of your health — all in one place</p>
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #000000; line-height: 1.6;">If you ever need help, Total Health is right here to guide you.</p>
              <p style="margin: 0 0 5px 0; font-size: 16px; color: #000000; line-height: 1.6;">Thanks,</p>
              <p style="margin: 0 0 50px 0; font-size: 16px; font-weight: 700; color: #000000; line-height: 1.6;">Total Health Team</p>
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #000000; line-height: 1.6;">Total Health at the touch of a button! Download our app for Google & APPLE.</p>
              
              <!-- App Store Buttons -->
              <table role="presentation" style="border-collapse: collapse; margin-bottom: 40px;">
                <tr>
                  <td style="padding-right: 15px;">
                      <img src="https://res.cloudinary.com/dlyb5lech/image/upload/v1776167732/google-play_hv6ohh_up1f1p.png" alt="Get it on Google Play" style="height: 30px; width: auto; display: block;">
                  </td>
                  <td>
                      <img src="https://res.cloudinary.com/dlyb5lech/image/upload/v1776167742/app-store_bka4d7_iifres.png" alt="Download on the App Store" style="height: 30px; width: auto; display: block;">
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 10px 0; font-size: 16px; color: #000000; line-height: 1.6;">
                Questions or faq? Contact us at <a href="mailto:support@geodevcodes.dev" style="color: #5B6EF5; text-decoration: none;">support@geodevcodes.dev</a>. If you'd rather not receive this kind of email, Don't want any more emails from Total Health? <a href="#" style="color: #5B6EF5; text-decoration: none;">Unsubscribe</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #ffffff; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #000000; line-height: 1.6;">100 Smith Street, Melbourne VIC 3000</p>
              <p style="margin: 0; font-size: 14px; color: #000000; line-height: 1.6;">© 2025 Total Health</p>
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
