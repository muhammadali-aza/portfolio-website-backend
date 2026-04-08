const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes"); // Path to your routes

const app = express();
app.use(cors());
app.use(express.json());

// Use the routes you defined
app.use("/api/form", formRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));