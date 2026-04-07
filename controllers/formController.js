const Form = require("../models/Form");
const sendEmail = require("../utils/sendEmail");

exports.submitForm = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    // Save in DB
    const newForm = new Form({ name, phone, email, subject, message });
    await newForm.save();

    // Send Email
    await sendEmail({ name, phone, email, subject, message });

    res.status(200).json({
      success: true,
      message: "Form submitted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};