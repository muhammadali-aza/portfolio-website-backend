const nodemailer = require("nodemailer");
const dns = require("dns");

const sendEmail = async (data) => {
  // Force IPv4 again just to be safe
  dns.setDefaultResultOrder("ipv4first");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Must be false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    family: 4, 
    connectionTimeout: 30000, // Increased to 30 seconds
    greetingTimeout: 30000,
    tls: {
      // Helps bypass common cloud network restrictions
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_USER}>`,
    to: "alirazaitservice@gmail.com",
    replyTo: data.email,
    subject: `📩 New Message: ${data.name}`,
    text: data.message, // Plain text version for better delivery
    html: `<p><strong>Name:</strong> ${data.name}</p><p>${data.message}</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("❌ Final Attempt Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;