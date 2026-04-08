const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  // 1. Setup the Gmail Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use false for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Adding a timeout helps if the connection is slow
    connectionTimeout: 10000, 
  });

  // 2. Configure the email content
  const mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_USER}>`,
    to: "alirazaitservice@gmail.com", 
    replyTo: data.email, 
    subject: `📩 New Message: ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #007bff;">New Contact Submission</h2>
        <hr />
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd;">
          ${data.message}
        </div>
      </div>
    `,
  };

  // 3. Send it
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Notification sent to Gmail successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;