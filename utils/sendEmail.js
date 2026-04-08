const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_USER}>`,
    to: "alirazaitservice@gmail.com",
    replyTo: data.email,
    subject: `📩 Portfolio: New Message from ${data.name}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          ${data.message}
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully via Gmail!");
    return { success: true };
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;