const sgMail = require("@sendgrid/mail");

// Dashboard se API Key uthayega
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = {
    to: process.env.EMAIL_TO,        // Railway Variables se aayega
    from: process.env.EMAIL_FROM,    // Railway Variables se aayega
    replyTo: data.email,
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
  } catch (error) {
    console.error("❌ Email Error Details:", error.response ? error.response.body : error);
    throw error;
  }
};

module.exports = sendEmail;
