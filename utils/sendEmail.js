const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
  }

  const createTransporter = ({ port, secure }) =>
    nodemailer.createTransport({
      host: "smtp.gmail.com",
      port,
      secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      socketTimeout: 30000,
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      family: 4,
    });

  const mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_USER}>`,
    to: "alirazaitservice@gmail.com",
    replyTo: data.email,
    subject: `📩 New Message from ${data.name}`,
    html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Message:</strong> ${data.message}</p>`,
  };

  const transports = [
    { port: 587, secure: false },
    { port: 465, secure: true },
  ];

  let lastError;

  for (const config of transports) {
    const transporter = createTransporter(config);

    try {
      await transporter.verify();
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent using smtp.gmail.com:${config.port}`);
      return { success: true };
    } catch (error) {
      console.warn(`⚠️ SMTP ${config.port} failed: ${error.message}`);
      lastError = error;
    }
  }

  console.error("❌ Email Error Detail:", lastError?.message || "Unknown error");
  throw lastError || new Error("Failed to connect to Gmail SMTP on both 587 and 465.");
};

module.exports = sendEmail;