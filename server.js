const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Add this
const formRoutes = require("./routes/formRoutes");

dotenv.config();

// 1. Connect to Database
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

// 2. Routes
app.use("/api/form", formRoutes);

// 3. Port (Let Railway decide or default to 8080)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));