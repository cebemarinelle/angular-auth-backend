const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendVerificationEmail = async (to, firstName, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/account/verify-email?token=${token}`;
  
  const sendSmtpEmail = {
    sender: { name: "AuthMaster", email: "no-reply@authmaster.com" },
    to: [{ email: to }],
    subject: "Verify Your Email - AuthMaster",
    htmlContent: `
      <html>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4F46E5;">Verify Your Email</h2>
            <p>Hi ${firstName},</p>
            <p>Thank you for registering. Please verify your email address:</p>
            <a href="${verifyUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              Verify Email Address
            </a>
            <p>This link expires in 24 hours.</p>
          </div>
        </body>
      </html>
    `
  };
  
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent to ${to}`, data.messageId);
  } catch (error) {
    console.error('Brevo error:', error.response?.body || error);
  }
};

const sendResetPasswordEmail = async (to, firstName, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/account/reset-password?token=${token}`;
  
  const sendSmtpEmail = {
    sender: { name: "AuthMaster", email: "no-reply@authmaster.com" },
    to: [{ email: to }],
    subject: "Reset Your Password - AuthMaster",
    htmlContent: `
      <html>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4F46E5;">Reset Your Password</h2>
            <p>Hi ${firstName},</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              Reset Password
            </a>
            <p>This link expires in 24 hours.</p>
          </div>
        </body>
      </html>
    `
  };
  
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Reset email sent to ${to}`);
  } catch (error) {
    console.error('Brevo reset error:', error.response?.body || error);
  }
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };