const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const allRoutes = require("./routes/allRoutes");

dotenv.config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS setup
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ✅ Body parser
app.use(bodyParser.json());

// ✅ API Routes
app.use("/ama-swad-api", allRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the ama-swad-api API",
    api_version: "1.0",
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Your requested API not found" });
});

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Start server
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
