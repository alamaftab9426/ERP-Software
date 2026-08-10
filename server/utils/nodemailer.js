import nodemailer from "nodemailer";
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendSetupPasswordEmail = async ({
  to,
  ownerName,
  companyName,
  setupToken,
}) => {
  if (!process.env.SMTP_HOST) {
    console.error("SMTP_HOST is missing — check your .env is loaded before this call.");
  }

  const transporter = getTransporter();
  const setupLink = `${process.env.CLIENT_URL}/setup-password?token=${setupToken}`;

  await transporter.sendMail({
    from: `"ERP Tracking System" <${process.env.SMTP_USER}>`,
    to,
    subject: `Set up your ERP Tracking System account for ${companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
        <h2 style="color: #1E8FA6;">Welcome to ERP Tracking System</h2>
        <p>Hi ${ownerName},</p>
        <p>
          Your company <strong>${companyName}</strong> has been registered on
          ERP Tracking System. Click the button below to set your password and activate
          your account.
        </p>
        <p style="margin: 24px 0;">
          <a
            href="${setupLink}"
            style="background:#2C7DA0;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;"
          >
            Set Your Password
          </a>
        </p>
        <p style="color:#64748b;font-size:13px;">
          This link expires in 24 hours. If you did not expect this email,
          you can safely ignore it.
        </p>
      </div>
    `,
  });
};