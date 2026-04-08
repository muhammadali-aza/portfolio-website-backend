const nodemailer = require("nodemailer");
const dns = require("dns");

const sendEmail = async (data) => {
  // Force IPv4 to avoid ENETUNREACH errors in cloud environments
  dns.setDefaultResultOrder("ipv4first");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL for Port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    family: 4, // Forces IPv4
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"Portfolio Notification" <${process.env.EMAIL_USER}>`,
    to: "alirazaitservice@gmail.com", 
    replyTo: data.email,
    subject: `📩 Portfolio: New Message from ${data.name}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff;">
          ${data.message}
        </div>
        <p style="font-size: 0.8em; color: #777; margin-top: 20px;">Received on: ${new Date().toLocaleString()}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully via Gmail!");
    return { success: true };
  } catch (error) {
    console.error("❌ Nodemailer Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;