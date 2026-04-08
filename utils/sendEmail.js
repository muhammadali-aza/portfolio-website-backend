const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // CRITICAL: This forces the connection to use IPv4 and bypasses the network error
    socketTimeout: 30000,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    family: 4 
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