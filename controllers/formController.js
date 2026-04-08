const Form = require("../models/Form");
const sendEmail = require("../utils/sendEmail");

const submitForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Required fields missing." });
    }

    // 1. Save message to MongoDB
    await Form.create({ name, email, phone, subject, message });

    // 2. Send the Email Notification
    await sendEmail({ name, email, phone, subject, message });

    return res.status(200).json({
      success: true,
      message: "Success! Message saved and notification sent.",
    });
  } catch (error) {
    console.error("❌ Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to process form.",
      error: error.message
    });
  }
};

module.exports = { submitForm };