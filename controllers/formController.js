const sendEmail = require("../utils/sendEmail");

/**
 * @desc    Submit contact form and send email via SendGrid
 * @route   POST /api/form/submit
 * @access  Public
 */
const submitForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // 1. Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (Name, Email, and Message).",
      });
    }

    // 2. Prepare data for the email utility
    const emailData = {
      name,
      email,
      phone: phone || "Not Provided",
      subject: subject || "No Subject",
      message,
    };

    // 3. Trigger SendGrid Email
    // Note: sendEmail internally handles sgMail.send()
    await sendEmail(emailData);

    // 4. Success Response
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully! I will get back to you soon.",
    });

  } catch (error) {
    console.error("❌ Form Controller Error:", error);

    // Handle specific SendGrid or Network errors
    if (error.response) {
      console.error("SendGrid Details:", error.response.body);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = { submitForm };