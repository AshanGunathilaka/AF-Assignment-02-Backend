const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS: Allow both local dev and Netlify
const allowedOrigins = [
  "https://ashan-af.netlify.app", // 🔁 Replace with your real Netlify domain
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Error handler
app.use(errorHandler);

// Dynamic port for Railway
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
