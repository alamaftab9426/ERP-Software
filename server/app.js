import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running Successfully",
  });
});

import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/superAdminRoutes/companyRoutes.js";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

// app.use("/api/employee", employeeRoutes);
// Error Middleware// app.use(errorHandler);

export default app;