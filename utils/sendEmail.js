const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = {
    to: process.env.EMAIL_TO,        // Your email
    from: process.env.EMAIL_FROM,    // Verified SendGrid sender
    replyTo: data.email,             // User email
    subject: `📩 New Message from ${data.name}`,
    html: `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email Sent Successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Email Error Details:", error);
    throw error;
  }
};

module.exports = sendEmail;