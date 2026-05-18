const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/account/verify-email?token=${token}`;
  
  const mailOptions = {
    from: '"Auth App" <noreply@authapp.com>',
    to,
    subject: 'Verify Your Email',
    html: `
      <h2>Email Verification</h2>
      <p>Please click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>This link expires in 24 hours.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (to, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/account/reset-password?token=${token}`;
  
  const mailOptions = {
    from: '"Auth App" <noreply@authapp.com>',
    to,
    subject: 'Reset Your Password',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 24 hours.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };