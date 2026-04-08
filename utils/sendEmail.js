const nodemailer = require("nodemailer");
const dns = require("dns");

const sendEmail = async (data) => {
  // Yeh line Node.js ko kehti hai ke IPv6 ko ignore karo aur sirf IPv4 use karo
  dns.setDefaultResultOrder("ipv4first");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Port 465 SSL ke liye zyada stable hai cloud par
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // CRITICAL SETTINGS
    family: 4, 
    connectionTimeout: 10000, 
    greetingTimeout: 10000,
    tls: {
      rejectUnauthorized: false // Railway ke security layer ko bypass karne ke liye
    }
  });

  const mailOptions = {
    from: `"Portfolio Notification" <${process.env.EMAIL_USER}>`,
    to: "alirazaitservice@gmail.com",
    replyTo: data.email,
    subject: `📩 Portfolio: New Message from ${data.name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ SUCCESS: Email Sent via IPv4!");
    return { success: true };
  } catch (error) {
    console.error("❌ Nodemailer Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;