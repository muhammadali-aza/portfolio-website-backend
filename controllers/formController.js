const Form = require("../models/Form"); // Import your model
const sendEmail = require("../utils/sendEmail");

const submitForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    // 1. Save to MongoDB (Optional but recommended)
    const newForm = await Form.create({ name, email, phone, subject, message });

    // 2. Prepare email data
    const emailData = { name, email, phone, subject, message };

    // 3. Trigger Email
    await sendEmail(emailData);

    return res.status(200).json({
      success: true,
      message: "Message saved and email sent!",
    });

  } catch (error) {
    console.error("❌ Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Process failed.",
      error: error.message,
    });
  }
};

module.exports = { submitForm };