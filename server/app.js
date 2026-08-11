import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Super Admin Routes
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/superAdminRoutes/companyRoutes.js";
import subscriptionRoutes from "./routes/superAdminRoutes/subcriptionRoutes.js";

// Admin Routes
import departmentRoutes from "./routes/admin/departmentRoutes.js";
import createEmployeeRoutes from "./routes/admin/createEmployeeRoutes.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://erp-softwareai.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI ERP Backend Running Successfully",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running Successfully",
  });
});
// SUPER ADMIN ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/subscription", subscriptionRoutes);

// ADMIN ROUTES
app.use("/api/admin/department", departmentRoutes);
app.use("/api/admin/employee", createEmployeeRoutes);


export default app;