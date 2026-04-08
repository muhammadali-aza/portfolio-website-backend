const express = require("express");
const router = express.Router();
const { submitForm } = require("../controllers/formController");

router.post("/submit", submitForm);

// CRITICAL: Make sure this line exists!
module.exports = router;