import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();
console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);
console.log("Gemini Key Prefix:", process.env.GEMINI_API_KEY?.substring(0, 8));

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/resumes", resumeRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Multer / general error handler
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
