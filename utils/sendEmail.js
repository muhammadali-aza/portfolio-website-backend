const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Must be false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // This section is the "secret sauce" for cloud hosting
    family: 4, // Forces IPv4 to fix ENETUNREACH
    tls: {
      rejectUnauthorized: false, // Helps with self-signed cert issues on cloud networks
      minVersion: "TLSv1.2"
    },
    connectionTimeout: 20000, // Give it more time
    greetingTimeout: 20000,
  });

  const mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, 
    replyTo: data.email,
    subject: `📩 Portfolio: New Message from ${data.name}`,
    html: `<h3>New Message</h3><p>${data.message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ SUCCESS: Email delivered via IPv4/587");
    return { success: true };
  } catch (error) {
    console.error("❌ Still failing. Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;