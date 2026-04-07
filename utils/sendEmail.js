const sgMail = require("@sendgrid/mail");

// Yeh Railway ke variables se API Key uthayega (Ensure it starts with SG.)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = {
    to: "alirazaitservice@gmail.com",       // Aapka email jahan message aana chahiye
    from: "alirazaitservice@gmail.com",     // Woh email jo SendGrid par verified hai
    replyTo: data.email,                    // User ka email jo usne form mein likha
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
    await sgMail.send(msg);
    console.log("✅ Email Sent Successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ SendGrid Error:");
    if (error.response) {
      console.error(error.response.body); // Yeh detail mein batayega agar verification ka issue hai
    } else {
      console.error(error);
    }
    throw error;
  }
};

module.exports = sendEmail;