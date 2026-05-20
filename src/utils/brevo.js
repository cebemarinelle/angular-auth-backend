const SibApiV3Sdk = require('@getbrevo/brevo');

let apiClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = apiClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendVerificationEmail = async (to, firstName, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/account/verify-email?token=${token}`;
  
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { 
    name: "AuthMaster", 
    email: "no-reply@authmaster.com" 
  };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = "Verify Your Email - AuthMaster";
  sendSmtpEmail.htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4F46E5;">Verify Your Email</h2>
          <p>Hi ${firstName},</p>
          <p>Thank you for registering with AuthMaster. Please verify your email address to complete your registration.</p>
          <a href="${verifyUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Verify Email Address
          </a>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, please ignore this email.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">© 2026 AuthMaster. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
  
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent to ${to}`, data.messageId);
  } catch (error) {
    console.error('Brevo error:', error);
  }
};

const sendResetPasswordEmail = async (to, firstName, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/account/reset-password?token=${token}`;
  
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { 
    name: "AuthMaster", 
    email: "no-reply@authmaster.com" 
  };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = "Reset Your Password - AuthMaster";
  sendSmtpEmail.htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4F46E5;">Reset Your Password</h2>
          <p>Hi ${firstName},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Reset Password
          </a>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;
  
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Reset email sent to ${to}`);
  } catch (error) {
    console.error('Brevo reset error:', error);
  }
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };