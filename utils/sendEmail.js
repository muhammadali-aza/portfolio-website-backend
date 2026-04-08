const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    port: 587,
    secure: false,
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

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully via IPv4!");
    return { success: true };
  } catch (error) {
    console.error("❌ Email Error Detail:", error.message);
    throw error;
  }
};

module.exports = sendEmail;