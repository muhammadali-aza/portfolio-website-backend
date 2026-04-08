const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  // 1. Create Transporter using Gmail settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail: alirazaitservice@gmail.com
      pass: process.env.EMAIL_PASS, // Your App Password: lhqz qdvi neyx xeao
    },
  });

  // 2. Define Email Options
  const mailOptions = {
    from: `"Portfolio Notification" <${process.env.EMAIL_USER}>`, 
    to: "alirazaitservice@gmail.com", // Where you want to receive the mail
    replyTo: data.email,              // Allows you to hit 'Reply' to the user
    subject: `📩 Portfolio: New Message from ${data.name}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not Provided"}</p>
        <p><strong>Subject:</strong> ${data.subject || "No Subject"}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          ${data.message}
        </div>
      </div>
    `,
  };

  // 3. Send the Email
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully via Gmail!");
    return { success: true };
  } catch (error) {
    console.error("❌ Nodemailer Error:", error);
    throw error;
  }
};

module.exports = sendEmail;